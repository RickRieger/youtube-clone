from xmlrpc.client import ResponseError
from django.forms import modelformset_factory
from django.shortcuts import render
from logging import raiseExceptions
from xml.etree.ElementTree import Comment
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Reply
from .serializers import ReplySerializer
from comments.models import Comments

# Create your views here.
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def replies(request,pk):
    
    if request.method == 'GET':
        replies = Reply.objects.filter(comment = pk)
        serializer = ReplySerializer(replies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        print('=============reply============', pk, request.data)
        comment = get_object_or_404(Comments,pk=pk)
        serializer = ReplySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(comment = comment,user_id = request.user.id)
            return Response(serializer.data,status = status.HTTP_201_CREATED)
        return ResponseError(serializer.errors,status = status.HTTP_400_BAD_REQUEST)

        



        



#     if request.method == 'POST':
#     serializer = CommentsSerializer(data=request.data)
# if serializer.is_valid():
#     serializer.save(user=request.user)
#     return Response(serializer.data, status=status.HTTP_201_CREATED)
# return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)