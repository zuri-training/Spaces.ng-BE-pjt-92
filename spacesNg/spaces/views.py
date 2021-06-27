from django.shortcuts import render
from allauth.account.views import PasswordChangeView
# Create your views here.

class CustomPasswordChangeView(PasswordChangeView):
    success_url = '/'