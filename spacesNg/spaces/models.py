from django.db import models
from taggit.managers import TaggableManager

# Create your models here.

class PublishedManager(models.Manager):
    def get_queryset(self):
        return super(PublishedManager, self).get_queryset().filter(status='published')

class Spaces(models.Model):
    ANY = 'ANY'
    FOUR = '1-4'
    NINE = '5-9'
    FOURTEEN = '10-14'
    NINETEEN = '15-19'
    TWENTYNINE = '20-29'
    THIRTYPLUS = '30+'

    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
        )
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
    slug = models.SlugField(max_length=200, default='')
    description = models.TextField()
    capacity = models.CharField(max_length=8, choices=CAPACITY_CHOICES, default=ANY)
    pricing = models.PositiveIntegerField()
    image = models.ImageField(upload_to='images/%Y/%m/%d/')
    state = models.CharField(max_length=64, default='')
    lga = models.CharField(max_length=64, default='')
    address = models.CharField(max_length=256, default='')
    created = models.DateField(auto_now_add=True, db_index=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')

    objects = models.Manager()
    published = PublishedManager()
    facilities = TaggableManager(verbose_name="Facilities")
    
    class Meta:
        verbose_name = 'Space'
        verbose_name_plural = 'Spaces'
# class Facility(models.Model):
