"""Models for the application."""
from django.db import models
from django.utils.translation import ugettext_lazy as _

from djcelery_model.models import TaskMixin

class Token(models.Model):
    access_token = models.CharField(max_length=30)
    refresh_token = models.CharField(max_length=30)
    date_acquired = models.DateTimeField(auto_now=True)
