# Generated by Django 4.0.4 on 2022-04-20 18:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0007_rename_username_comments_user_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comments',
            old_name='user_name',
            new_name='username',
        ),
    ]
