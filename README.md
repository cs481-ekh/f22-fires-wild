# FPA-FOD-Plus Website

<img src="img/ffp_logo.png" width="40%"></img>
<img src="img/ffp_logo_dark.png" width="40%"></img>

## Team: Fires Wild

### Members:

- David Adams
- Benjamin Collins
- Brenden Marks
- Jeremy Stocking
- Samuel Wasko

# Architectural Diagram

<img src="img/fires-wild-diagram.png" width="100%"></img>

# Prereqs

- Docker (recommend docker desktop)
  - docker-compose
- Python 3
- MySQL

# Project Health

[![Build Phase](https://github.com/cs481-ekh/f22-fires-wild/actions/workflows/build.yml/badge.svg)](https://github.com/cs481-ekh/f22-fires-wild/actions/workflows/build.yml)

[![Test Phase](https://github.com/cs481-ekh/f22-fires-wild/actions/workflows/test.yml/badge.svg)](https://github.com/cs481-ekh/f22-fires-wild/actions/workflows/test.yml)

# Build & Run

## Clean install (or clean refresh)

From the root project directory:

- `$ docker-compose down -v`
  - this will kill any currently running instances of this project and DELETE their associated volumes
  - this is neccesary because as mysql configuration changes, it will not be reflected until volumes are removed and re-created
- `$ docker-compose build`
  - this will build the project
  - output from this command contains information useful for debugging
- `$ docker-compose up`
  - this will start the project
- You should now see the containers running in docker, and be able to access the website from localhost.

## Troubleshooting

- Django container error: `django.db.utils.OperationalError: (2003, "Can't connect to MySQL server on 'ffp-mysql' ([Errno 111] Connection refused)")`
  - The mysql container is not usually initialized the first time before the django container tries to access it. to solve this, you can restart just the django container in Docker desktop, or try running `$ docker-compose down` (NO `-v`) then `$ docker-compose up`. This can also be accomplished by stopping the Django container and restarting it using Docker Desktop.

# Attributions:

- [Django MySQL Docker Sample - Sergei Konik](https://skonik.me/setup-django-with-mysql-using/)
- [Fire Emoji - Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Noto_Emoji_KitKat_1f525.svg)
- [Unutterable Font](https://fontesk.com/unutterable-font/)
