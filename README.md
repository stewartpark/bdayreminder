Birthday Reminder built for ![](https://github.com/stewartpark/bdayreminder/blob/master/misc/drchrono.png)
====================================

Birthday Reminder, written in Python/Django + Celery + Angular.js.

![](https://github.com/stewartpark/bdayreminder/blob/master/misc/Login.png)
![](https://github.com/stewartpark/bdayreminder/blob/master/misc/Main.png)
![](https://github.com/stewartpark/bdayreminder/blob/master/misc/List.png)
![](https://github.com/stewartpark/bdayreminder/blob/master/misc/Stats.png)

## How to deploy via Docker

To deploy the server, type the following in a docker host:

```
$ docker build -t bday_reminder .

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
