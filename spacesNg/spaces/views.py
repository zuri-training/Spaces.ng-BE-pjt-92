from django.core import paginator
from django.db.models import Count
from django.db.models import Q
from django.shortcuts import get_object_or_404, redirect, render
from allauth.account.views import PasswordChangeView
from .models import Spaces
from .forms import ContactUsForm, RegisterSpaceForm
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib import messages
from django.utils.text import slugify
# Create your views here.

class CustomPasswordChangeView(PasswordChangeView):
    # URL to redirect to once passoword has been reset successfully
    success_url = '/accounts/password/reset/key/done'


def index(request):
    featured_spaces = Spaces.published.order_by('-created')[:5]
    return render(request, 'spaces/index.html', {'featured_spaces': featured_spaces})

def dashboard(request):
    object_list = Spaces.published.all()
    facility_list = Spaces.facilities.most_common()[:5]  # Get the first five most common facilities
    spacecount = Spaces.published.all() # Noted for the sake of counting how many spaces has been published altogether
    
    # For filter purpose
    if ('capacity' in request.GET) and (request.GET['capacity'] != ''):
        capacity = request.GET['capacity']
        object_list = object_list.filter(capacity__search=capacity)
    if ('facilities' in request.GET) and (request.GET['facilities'] != ''):
        filter_list = request.GET['facilities'].split(',')
        for facility in filter_list:
            object_list = object_list.filter(facilities__name__search=facility)
    if ('sort' in request.GET) and (request.GET['sort'] != ''):
        sort_list = ['rating', '-rating', 'created', '-created']  # A list of allowed items to sort by
        sort = request.GET['sort']
        if sort in sort_list:
            object_list = object_list.order_by(sort)

    paginator = Paginator(object_list, 2)  # 2 spaces per page for development purposes. 10 spaces per page on the deployed version
    page = request.GET.get('page')
    try:
        spaces = paginator.page(page)
    except PageNotAnInteger:
        spaces = paginator.page(1)
    except EmptyPage:
        spaces = paginator.page(paginator.num_pages)
    return render(request, 'spaces/dashboard.html', {'spaces': spaces, 'page': page, 'spacecount': spacecount, 'facility_list': facility_list})

@login_required
def space_detail(request, space):
    space = get_object_or_404(Spaces, slug=space, status='published')
    space_tags_ids = space.facilities.values_list('id', flat=True)
    similar_spaces = Spaces.published.filter(facilities__in=space_tags_ids).exclude(id=space.id)
    similar_spaces = similar_spaces.annotate(same_tags=Count('facilities')).order_by('-same_tags', '-created')[:3]
    return render(request, 'spaces/detail.html', {'space': space, 'similar_spaces': similar_spaces})

def search(request):
    try:
        if 'state' in request.GET:
            state = request.GET['state']
            lga = None
            object_list = []
            stateCount = Spaces.published.filter(state__search=state).count()
            facility_list = Spaces.facilities.most_common()[:5]  # Get the first five most common facilities
            if ('lga' in request.GET) and (request.GET['lga'] != ''):
                lga = request.GET['lga']
                object_list = Spaces.published.filter(state__search=state, lga__search=lga)
            else:
                object_list = Spaces.published.filter(state__search=state)
            if (not state) and (not lga):
                return redirect('spaces:dashboard')
            if ('capacity' in request.GET) and (request.GET['capacity'] != ''):
                capacity = request.GET['capacity']
                object_list = object_list.filter(capacity__search=capacity)
            if ('facilities' in request.GET) and (request.GET.getlist('facilities') != ['']):
                filter_list = request.GET.getlist('facilities')
                for facility in filter_list:
                    object_list = object_list.filter(facilities__name__search=facility)
            if ('sort' in request.GET) and (request.GET['sort'] != ''):
                sort_list = ['rating', '-rating', 'created', '-created']  # A list of allowed items to sort by
                sort = request.GET['sort']
                if sort in sort_list:
                    object_list = object_list.order_by(sort)
            paginator = Paginator(object_list, 2)  # 2 spaces per page for development purposes. 10 spaces per page on the deployed version
            page = request.GET.get('page')
            try:
                results = paginator.page(page)
            except PageNotAnInteger:
                results = paginator.page(1)
            except EmptyPage:
                results = paginator.page(paginator.num_pages)
        else:
            return redirect('spaces:dashboard')
    except:
        return redirect('spaces:dashboard')
    return render(request, 'spaces/search.html', {'results': results, 'state': state, 'lga': lga, 'statecount': stateCount, 'lgacount': object_list, 'facility_list': facility_list})


@login_required
def register_space(request):
    if request.method == 'POST':
        f = RegisterSpaceForm(data=request.POST, files=request.FILES)
        if f.is_valid():
            new_space = f.save(commit=False)
            new_space.slug = slugify(new_space.name)
            new_space.save()
            f.save_m2m()
            return redirect('spaces:register_space_done')
    else:
        f = RegisterSpaceForm()
    return render(request, 'spaces/register_space.html', {'form': f})


@login_required
def register_space_done(request):
    return render(request, 'spaces/register_space_done.html')

def aboutus(request):
    return render(request, 'spaces/aboutus.html')

def contactus(request):
    if request.method == 'POST':
        f = ContactUsForm(request.POST)
        if f.is_valid():
            f.save()
            success = "Thank You! Your message has been submitted sucessfully. We'd get back to you shortly."
            return render(request, 'spaces/contactus.html', {'form': f, 'success': success})
    else:
        f = ContactUsForm()
    return render(request, 'spaces/contactus.html', {'form': f})