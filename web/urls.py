"""URL configuration for the server-side rendering."""
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name="index")
]
