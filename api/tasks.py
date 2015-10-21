"""."""
from __future__ import absolute_import

from django.core.mail import get_connection, EmailMultiAlternatives
from django.template.loader import get_template
from django.template import Context

from celery import shared_task
import requests


def _get_doctor(token, doctor):
    data = requests.get(
        "https://drchrono.com/api/doctors/{}".format(doctor),
        headers={
            'Authorization': 'Bearer {}'.format(token)
        }
    ).json()
    return data


@shared_task
def send_emails(token, list_):
    """Send emails to the patient with rendered HTMLs."""
    conn = get_connection()
    doctors = {}
    mails = []
    for x in list_:
        if x['doctor'] not in doctors:
            doctors[x['doctor']] = _get_doctor(token, x['doctor'])

        # Doctor info.
        doctor = doctors[x['doctor']]
        title = "Happy birthday from " + (
            (doctor['suffix'] + ". ") if doctor['suffix'] else ""
            ) + doctor['last_name']
        mesg = get_template('happy_birthday.html').render(
            Context({
                'doctor': doctor,
                'patient': x
            })
        )
        body = EmailMultiAlternatives(
            title,
            title,
            doctor['email'],
            [x['email']]
        )
        body.attach_alternative(mesg, "text/html")
        mails.append(body)
    conn.send_messages(mails)
    conn.close()
