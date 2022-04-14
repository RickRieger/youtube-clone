from django.contrib import admin
from comments.models import Comments
from reply.models import Reply

# Register your models here.
admin.site.register(Comments)
admin.site.register(Reply)