from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Comments(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  username = models.CharField(max_length=255, default='')
  video = models.CharField(max_length=255)
  text = models.CharField(max_length=255)
  likes = models.IntegerField(default=0)
  dislikes = models.IntegerField(default = 0)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)



