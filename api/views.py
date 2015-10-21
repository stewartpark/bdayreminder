"""API endpoints that interact with the front-end."""
from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import JsonResponse, HttpResponseNotFound
from django.http import HttpResponseRedirect, HttpResponse
from django.conf import settings
from .models import Token
import requests


class PatientsV1View(TemplateView):
    """The endpoint class for `/api/v1/patients`.

    This class provides the patients data for the front-end.

    """

    def _get_list_of_patients(self, token):
        """Get a list of patients."""
        patients = []
        url = "https://drchrono.com/api/patients"
        while url:
            data = requests.get(
                url,
                headers={
                    'Authorization': 'Bearer {}'.format(token)
                }
            ).json()
            patients.extend(data['results'])
            url = data['next']
        return sorted(
            patients,
            key=lambda x:
                x['date_of_birth'][5:] if x['date_of_birth'] else "Empty"
        )

    def get(self, req):
        """Return a list of patients."""
        patients = self._get_list_of_patients(req.session['token'])
        return JsonResponse({
            'results': patients
        })


class ActionsLogInV1View(TemplateView):
    """The endpoint class for `/api/v1/login`.

    This class is used to check if the user is logged in, or to store the token
    in the database for later use.
    """

    def get(self, req):
        """Check if the user is logged in."""
        if 'is_logged' in req.session:
            return JsonResponse({
                "token": req.session.get("token"),
                "username": req.session.get("username")
            })
        else:
            return HttpResponseNotFound("The user is not logged in.")

    def delete(self, req):
        del req.session['is_logged']
        del req.session['token']
        return HttpResponse("")


class ActionsOAuthRedirectV1View(TemplateView):
    """A helper endpoint that works with OAuth.

    Interacts with the redirection of OAuth authentication.
    """

    def _token_exchange(self, code):
        response = requests.post('https://drchrono.com/o/token/', data={
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri':
                settings.REDIRECT_BASE_URL + "/api/v1/actions/redirect",
            'client_id': settings.CLIENT_ID,
            'client_secret': settings.CLIENT_SECRET
        })

        response.raise_for_status()
        data = response.json()

        return data['access_token']

    def _get_info(self, token):
        response = requests.get(
            "https://drchrono.com/api/users/current",
            headers={
                'Authorization': 'Bearer {}'.format(token)
            }
        )
        response.raise_for_status()
        data = response.json()

        return data

    def get(self, req):
        """Get the code from the OAuth authentication page and token exchange.

        Features omitted at the moment:
            - Token refreshing
            - Token storing
        """
        code = req.GET.get("code")
        token = self._token_exchange(code)

        info = self._get_info(token)

        req.session["is_logged"] = True
        req.session["token"] = token
        req.session['username'] = info['username']

        return HttpResponseRedirect("/")
