from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Video(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="videos")
    thumbnail = models.ImageField(upload_to="thumbnails/")
    video_file = models.FileField(upload_to="videos/")
    duration = models.CharField(max_length=20, blank=True)  

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
