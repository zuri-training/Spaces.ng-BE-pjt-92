from django import forms
from django.db.models import fields
from .models import ContactUs, Spaces


class ContactUsForm(forms.ModelForm):
	class Meta:
		model = ContactUs
		fields = '__all__'

class RegisterSpaceForm(forms.ModelForm):
    class Meta:
        model = Spaces
        fields = ('name', 'description', 'capacity', 'pricing', 'image', 'state', 'lga', 'address', 'email', 'facebook', 'twitter', 'telephone', 'instagram', 'facilities')

    def __init__(self, *args, **kwargs):
        super(RegisterSpaceForm, self).__init__(*args, **kwargs)
        self.fields['image'].required = False