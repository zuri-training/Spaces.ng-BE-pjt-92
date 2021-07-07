from django.core import paginator
from django.shortcuts import get_object_or_404, redirect, render
from allauth.account.views import PasswordChangeView
from .models import Spaces
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# Create your views here.

class CustomPasswordChangeView(PasswordChangeView):
    success_url = '/accounts/password/reset/key/done'


def index(request):
    return render(request, 'spaces/index.html')

def dashboard(request):
    object_list = Spaces.published.all()
    paginator = Paginator(object_list, 10)
    page = request.GET.get('page')
    try:
        spaces = paginator.page(page)
    except PageNotAnInteger:
        spaces = paginator.page(1)
    except EmptyPage:
        spaces = paginator.page(paginator.num_pages)
    return render(request, 'spaces/dashboard.html', {'spaces': spaces, 'page': page})

@login_required
def space_detail(request, space):
    space = get_object_or_404(Spaces, slug=space, status='published')
    return render(request, 'spaces/detail.html', {'space': space})

def search(request):
    if 'state' in request.GET:
        state = request.GET['state']
        lga = None
        object_list = []
        stateCount = Spaces.published.filter(state__search=state).count()
        if 'lga' in request.GET:
            if request.GET['lga']:
                lga = request.GET['lga']
                object_list = Spaces.published.filter(state__search=state, lga__search=lga)
        else:
            object_list = Spaces.published.filter(state__search=state).order_by('created')
        if (not state) and (not lga):
            return redirect('spaces:dashboard')
        paginator = Paginator(object_list, 10)
        page = request.GET.get('page')
        try:
            results = paginator.page(page)
        except PageNotAnInteger:
            results = paginator.page(1)
        except EmptyPage:
            results = paginator.page(paginator.num_pages)
    else:
        return redirect('spaces:dashboard')
    return render(request, 'spaces/search.html', {'results': results, 'state': state, 'lga': lga, 'statecount': stateCount, 'lgacount': object_list.count()})


@login_required
def register_space(request):
    return render(request, 'spaces/register_space.html')


@login_required
def register_space_done(request):
    return render(request, 'spaces/register_space_done.html')