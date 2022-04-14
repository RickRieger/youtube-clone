from django.urls import path, include
from comments import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('comments/<int:video_id>', views.get_all_comments),
    path('comments/<int:video_id>', views.post_comment),
]
