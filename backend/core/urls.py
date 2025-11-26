from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.categories),
    path('videos/category/<int:category_id>/', views.videos_by_category),
]
