from django.contrib import admin
from django.urls import path, include
from reply import views

urlpatterns = [
    path('api/comments/<int:comment_id>/replies', views.comment_reply),
]
