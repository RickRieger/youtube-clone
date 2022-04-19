from django.urls import path, include
from . import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('<str:pk>/', views.get_all_comments),
    path('update/<int:pk>/', views.comments),
]
