from django.shortcuts import render
from rest_framework import generics, permissions

from spaces.models import Spaces
from .serializers import SpaceSerializer

# Create your views here.
class SpaceAPIView(generics.ListAPIView):
    queryset = Spaces.published.all()
    serializer_class = SpaceSerializer

class SpaceDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = 'slug'
    queryset = Spaces.published.all()
    serializer_class = SpaceSerializer
