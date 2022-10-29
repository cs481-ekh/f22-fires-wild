from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    
    path('results/', views.results, name='results'),
    
    path('administrator/', views.administrator, name='administrator'),
]