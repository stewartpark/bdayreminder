from django.conf.urls import url
from django.views.decorators.cache import cache_page
from . import views

urlpatterns = [
    url(
        r'^v1/actions/login',
        views.ActionsLogInV1View.as_view(),
        name="actions_login"
    ),
    url(
        r'^v1/actions/redirect',
        views.ActionsOAuthRedirectV1View.as_view(),
        name="actions_redirect"
    ),
    url(
        r'^v1/patients',
        cache_page(60*60)(views.PatientsV1View.as_view()),
        name="patients"
    )
]
