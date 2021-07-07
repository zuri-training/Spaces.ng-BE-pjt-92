from django.contrib import admin
from .models import Spaces

# Register your models here.
@admin.register(Spaces)
class SpacesAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'pricing', 'capacity', 'status')
    list_filter = ('status', 'created', 'capacity')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    date_hierarchy = 'created'
    ordering = ('status', 'capacity')