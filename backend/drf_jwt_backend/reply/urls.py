from django.contrib import admin
from django.urls import path, include
from reply import views

urlpatterns = [
    path('<int:pk>/', views.replies),
]
