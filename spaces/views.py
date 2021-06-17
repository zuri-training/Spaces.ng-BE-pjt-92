from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.
def landingPageView(request):
    return render(request, 'index.html')
    # return HttpResponse('<p>Hello World</p>')