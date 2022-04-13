from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Comments(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  video = models.CharField(max_length=255)
  text = models.CharField(max_length=255)
  likes = models.IntegerField()
  dislikes = models.IntegerField()



