import os
import json

from django.core.management.base import BaseCommand
from core.models import Video,Category

class Command(BaseCommand):
    help = "Seed predefined categories and video metadata"

    def handle(self, *args, **kwargs):
        # ---- 1. Predefined Categories ----
        categories = [
            "Action",
            "Comedy",
            "Drama",
            "Horror",
            "Romance",
            "Sci-Fi",
        ]

        category_objs = {}

        for cat in categories:
            obj, created = Category.objects.get_or_create(name=cat)
            category_objs[cat] = obj
            print(f"Category ready: {cat}")

        # ---- 2. Predefined Videos ----
        # These MUST match filenames already stored in your /media/ folder.
        videos = [
            {
                "title": "Wild Adventure",
                "duration": "03:20",
                "video_file": "vid1.mp4",
                "thumbnail": "img1.jpg",
                "category": "Action",
                "Description":"Video of Wild adventure"
            },
            {
                "title": "Funny Moments",
                "duration": "02:10",
                "video_file": "vid2.mp4",
                "thumbnail": "img2.jpg",
                "category": "Comedy",
                "Description":"Video of Funny moments"
            },
            {
                "title": "Hilarious",
                "duration": "02:10",
                "video_file": "vid3.mp4",
                "thumbnail": "img3.jpg",
                "category": "Comedy",
                "Description":"Video of Hilarious"
            },
            {
                "title": "Mr. Bean",
                "duration": "02:10",
                "video_file": "vid4.mp4",
                "thumbnail": "img4.jpg",
                "category": "Comedy",
                "Description":"Video of Mr. Bean"
            },
            {
                "title": "Deep Drama",
                "duration": "05:12",
                "video_file": "vid5.mp4",
                "thumbnail": "img5.jpg",
                "category": "Drama",
                "Description":"Video of Deep drama"
            },
        ]

        for vid in videos:
            Video.objects.get_or_create(
                title=vid["title"],
                duration=vid["duration"],
                video_file=vid["video_file"],
                thumbnail=vid["thumbnail"],
                category=category_objs[vid["category"]],
                description=category_objs["description"]
            )
            print(f"Video added: {vid['title']}")

    print("Seed completed successfully!")