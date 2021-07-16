from django.urls import path
from django.urls.conf import include

from .views import SpaceAPIView, SpaceDetailView

urlpatterns = [
    path('', SpaceAPIView.as_view()),
    path('<str:slug>', SpaceDetailView.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
]
