FROM python:2.7
MAINTAINER Stewart Park <stewartpark92@gmail.com>

ENV REDIS_DB=0
ENV REDIS_PASSWORD=
ENV DRCHRONO_CLIENT_ID=
ENV DRCHRONO_CLIENT_SECRET=
ENV DRCHRONO_REDIRECT_BASE_URL=
ENV EMAIL_HOST=
ENV EMAIL_PORT=25
ENV EMAIL_USER=
ENV EMAIL_PASSWORD=
ENV EMAIL_USE_TLS=1

WORKDIR /app
ADD . /app
EXPOSE 80
RUN pip install -r requirements.txt
RUN /app/manage.py migrate

CMD ["runserver", "0.0.0.0:80"]
ENTRYPOINT ["/app/manage.py"]
