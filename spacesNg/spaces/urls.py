from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'spaces'

urlpatterns = [
    path('', views.index, name='index'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('findSpace/', views.search, name='search'),
    path('register/', views.register_space, name='register_space'),
    path('register/done/', views.register_space_done, name='register_space_done'),
    path('<slug:space>/', views.space_detail, name='space_detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
