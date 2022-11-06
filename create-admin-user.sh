#!/bin/bash
set -e

csv=$1

if [[ $# < 3  || ( $@ == "--help") ||  $@ == "-h" ]]
then 
	echo "Usage: $0 <admin-username> <admin-password> <admin-email>"
	exit 0
fi 

user=$1
pass=$2
email=$3

docker exec -i -w /ffp-backend/ffp-backend ffp-django python manage.py migrate
docker exec -i -w /ffp-backend/ffp-backend ffp-django python manage.py shell <<< "from django.contrib.auth.models import User; User.objects.create_superuser('${user}', '${email}', '${pass}')"

echo ""
echo "The following are your credentials. Keep them in a safe place."
echo "To reset a password, you will have to stop the container and re-build the image then run this script again."
echo "user: ${user}"
echo "password: ${pass}"
echo "email: ${email}"
