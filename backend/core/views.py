from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Category, Video
from .serializers import CategorySerializer, VideoSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def categories(request):
    cats = Category.objects.all()
    return Response(CategorySerializer(cats, many=True).data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def videos_by_category(request, category_id):
    vids = Video.objects.filter(category_id=category_id)
    return Response(VideoSerializer(vids, many=True).data)
