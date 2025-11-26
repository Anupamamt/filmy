from rest_framework import serializers
from .models import Category, Video

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class VideoSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'category', 'thumbnail', 'video_file', 'duration']
