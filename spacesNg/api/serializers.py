from rest_framework import serializers
from taggit_serializer.serializers import (TagListSerializerField, TaggitSerializer)

from spaces.models import Spaces

class SpaceSerializer(TaggitSerializer, serializers.ModelSerializer):
    facilities = TagListSerializerField()
    class Meta:
        model = Spaces
        fields = '__all__'