from logging import raiseExceptions
from xml.etree.ElementTree import Comment
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Comments
from .serializers import CommentsSerializer

# Create your views here.
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def comments(request,pk=''):
    if request.method == 'GET':
        comments = Comments.objects.filter(video = pk)
        serializer = CommentsSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = CommentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def comments_details(request,pk):
    comment = get_object_or_404(Comments,pk=pk)
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")

    if request.method == 'PUT':
        serializer = CommentsSerializer(comment,data = request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    





# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def update_comment(request,comment_id):
#     comments = Comments.objects.filter(user_id=request.user.id)
#     serializer = CommentsSerializer(comments, many=True)
#     return Response(serializer.data)
        
