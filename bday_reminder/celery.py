"""Celery initialization."""
from __future__ import absolute_import, print_function

import os

from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bday_reminder.settings')


app = Celery('bday_reminder')

app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


@app.task(bind=True)
def debug_task(self):
    """For debugging."""
    print("Request: {0!r}".format(self.request))
