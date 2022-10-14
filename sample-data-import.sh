#!/bin/bash
set -e

echo "transferring source files..."

docker cp ./sql/createtable.sql ffp-mysql:./var/lib/mysql-files/
docker cp ./sql/sample_create_insert_statements.sql ffp-mysql:./var/lib/mysql-files/

echo "transfer complete."

# we need to wait for the db connection to be open before we can run the import
# chose this solution because it is self-contained (didn't want to create a healthcheck on the container for this)
# https://stackoverflow.com/a/48703384/16610401
while ! docker exec -i ffp-mysql mysql -uroot -pmysql-root-password -e "status" &> /dev/null ; do
    echo "waiting for database connection..."
    sleep 5
done   

echo "creating table and importing data"
# https://stackoverflow.com/a/39720988/16610401
docker exec -i ffp-mysql mysql -uroot -pmysql-root-password  <<< "use ffp-mysql-db; source /var/lib/mysql-files/createtable.sql; source /var/lib/mysql-files/sample_create_insert_statements.sql;"

# req'd because it takes time to run the command that isn't reflected here, admittedly inaccurate :(
sleep 2
echo "data import complete"

echo "restarting django container to re-initialize connection"
# here we have to restart the django container to re-init the conne
docker restart ffp-django

# trying this to ensure that django is ready for connections b4 tests, not sure if this is the problem
sleep 2
echo "restart complete"