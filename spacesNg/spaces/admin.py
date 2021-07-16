from django.contrib import admin
from .models import Spaces, ContactUs

# Register your models here.
@admin.register(Spaces)
class SpacesAdmin(admin.ModelAdmin):
    list_display = ('name', 'pricing', 'capacity', 'created', 'status')
    list_filter = ('status', 'created', 'capacity')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    date_hierarchy = 'created'
    ordering = ('status', 'created')

@admin.register(ContactUs)
class ContactUsAdmin(admin.ModelAdmin):
	list_display = ('name', 'email', 'subject', 'date',)
	search_fields = ('name', 'email',)
	date_hierarchy = 'date'