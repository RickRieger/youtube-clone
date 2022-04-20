from rest_framework import serializers
from .models import Comments

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['id', 'user_id', 'video', 'text', 'likes','dislikes', 'created', 'updated', 'username']
        depth = 1
