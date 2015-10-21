"""Views for the front-end."""
from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.utils.safestring import mark_safe
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def index(req):
    """
    The index view function.

    Most of the rendering part of this application will be done in the
    front-end side.
    """
    return render(req, 'index.html', {
        "DRCHRONO_CLIENT_ID": mark_safe(repr(settings.CLIENT_ID)),
        "DRCHRONO_REDIRECT_BASE_URL":
            mark_safe(repr(settings.REDIRECT_BASE_URL))
    })
