Birthday Reminder built for <img src="https://github.com/stewartpark/bdayreminder/blob/master/misc/drchrono.png" height="30" />
=====================================================

Birthday Reminder, written in Python/Django + Celery + Angular.js.

[Demo](http://dev.epilet.com:8000/)

![](https://github.com/stewartpark/bdayreminder/blob/master/misc/Login.png)
![](https://github.com/stewartpark/bdayreminder/blob/master/misc/Main.png)
![](https://github.com/stewartpark/bdayreminder/blob/master/misc/List.png)
![](https://github.com/stewartpark/bdayreminder/blob/master/misc/Stats.png)
![](https://github.com/stewartpark/bdayreminder/blob/master/misc/TestEmail.png)

## How to deploy via Docker

To build the docker image, type the following:

```
# Install front-end dependencies.
$ bower install

# Build the image.  
$ docker build -t bday_reminder .
```

To deploy the server, push the docker image to the remote server and type the following in a docker host:

```
# Standalone Django web server
$ docker run -d -p 80:80 \
    -e DRCHRONO_CLIENT_ID=<client_id>  \
    -e DRCHRONO_CLIENT_SECRET=<client_secret> \
    -e DRCHRONO_REDIRECT_BASE_URL=http://foo.bar \
    -e EMAIL_HOST=<smtp_host> \
    -e EMAIL_PORT=25 \
    -e EMAIL_USER=bot@foo.bar \
    -e EMAIL_PASSWORD=<password> \
    -e EMAIL_USE_TLS=1 \
    --link redis:redis \
    -e REDIS_PASSWORD=<redis password> \
    -e REDIS_DB=0 \
    bday_reminder

# Celery worker
$ docker run -d \
    -e DRCHRONO_CLIENT_ID=<client_id>  \
    -e DRCHRONO_CLIENT_SECRET=<client_secret> \
    -e DRCHRONO_REDIRECT_BASE_URL=http://foo.bar \
    -e EMAIL_HOST=<smtp_host> \
    -e EMAIL_PORT=25 \
    -e EMAIL_USER=bot@foo.bar \
    -e EMAIL_PASSWORD=<password> \
    -e EMAIL_USE_TLS=1 \
    --link redis:redis \
    -e REDIS_PASSWORD=<redis password> \
    -e REDIS_DB=0 \
    bday_reminder celery worker
```
