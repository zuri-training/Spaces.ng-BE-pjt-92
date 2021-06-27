from django.db import models

# Create your models here.

class Spaces(models.Model):
    ANY = 'ANY'
    FOUR = '1-4'
    NINE = '5-9'
    FOURTEEN = '10-14'
    NINETEEN = '15-19'
    TWENTYNINE = '20-29'
    THIRTYPLUS = '30+'

    CAPACITY_CHOICES = [
        (ANY, 'Any'),
        (FOUR, '1-4'),
        (NINE, '5-9'),
        (FOURTEEN, '10-14'),
        (NINETEEN, '15-19'),
        (TWENTYNINE, '20-29'),
        (THIRTYPLUS, '30+'),
    ]
    
    name = models.CharField(max_length=64)
    slug = models.SlugField
    description = models.TextField()
    capacity = models.CharField(max_length=8, choices=CAPACITY_CHOICES, default=ANY)
    pricing = models.PositiveIntegerField()
    facilities = models.CharField(max_length=256, default='')
    image = models.ImageField(upload_to='images/%Y/%m/%d/')
    state = models.CharField(max_length=64, default='')
    lga = models.CharField(max_length=64, default='')
    address = models.CharField(max_length=256, default='')
    created = models.DateField(auto_now_add=True, db_index=True)
    available = models.BooleanField(null=True)

    
# class Facility(models.Model):
