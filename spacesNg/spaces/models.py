from django.db import models
from django.urls import reverse
from taggit.managers import TaggableManager

# Create your models here.

class PublishedManager(models.Manager):
    def get_queryset(self):
        return super(PublishedManager, self).get_queryset().filter(status='published')

class Spaces(models.Model):
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
    capacity = models.CharField(max_length=8, choices=CAPACITY_CHOICES, default=FOUR)
    pricing = models.PositiveIntegerField()
    image = models.ImageField(upload_to='images/%Y/%m/%d/', null=True, blank=True)
    state = models.CharField(max_length=64, default='')
    lga = models.CharField(max_length=64, default='')
    address = models.CharField(max_length=256, default='')
    created = models.DateField(auto_now_add=True, db_index=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    rating = models.CharField(max_length=4, default='')
    email = models.CharField(max_length=64, default='')
    facebook = models.CharField(max_length= 64, default='')
    twitter = models.CharField(max_length= 64, default='')
    telephone = models.CharField(max_length= 64, default='')
    instagram = models.CharField(max_length= 64, default='')


    objects = models.Manager()
    published = PublishedManager()
    facilities = TaggableManager(verbose_name="Facilities")
    
    class Meta:
        verbose_name = 'Space'
        verbose_name_plural = 'Spaces'
        ordering = ['-created']

    def __str__(self):
        return f'{self.name} - {self.lga}, {self.state}'

    
    def get_absolute_url(self):
        return reverse('spaces:space_detail', args=[self.slug])



class ContactUs(models.Model):
    name = models.CharField(max_length=64)
    email = models.EmailField(max_length=200)
    telephone = models.CharField(max_length=32)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Feedback"

    def __str__(self):
        return self.name