#!/bin/bash
#set -e

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

echo "editing mysql bind address"
docker exec -i ffp-mysql sed -i "s/.*bind-address.*/bind-address = 0.0.0.0/" /etc/my.cnf

echo "creating table and importing data"
# https://stackoverflow.com/a/39720988/16610401
docker exec -i ffp-mysql mysql -uroot -pmysql-root-password  <<< "use ffp-mysql-db; source /var/lib/mysql-files/createtable.sql; source /var/lib/mysql-files/sample_create_insert_statements.sql;"

# req'd because it takes time to run the command that isn't reflected here, admittedly inaccurate :(
sleep 5
echo "data import complete"

echo "restarting mysql and django containers to re-initialize connection"
# here we have to restart the mysql container because of change to bind address
docker restart ffp-mysql

while ! docker exec -i ffp-mysql mysql -uroot -pmysql-root-password -e "status" &> /dev/null ; do
    echo "waiting for database connection..."
    sleep 5
done 

# here we have to restart the django container to re-init the conne
docker restart ffp-django

# HACK test what's going on with the containers
sleep 10
echo "networks:"
docker network ls

echo "docker ps:"
docker ps -a   

echo "docker inspect -f:"
docker inspect -f '{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)

# HACK try curl to the heatmap endpoint

echo "GET localhost:8000 heatmap"
curl -XGET 'http://localhost:8000/api/heatmap/' -v

echo "GET 127.0.0.1:8000 heatmap"
curl -XGET 'http://127.0.0.1:8000/api/heatmap/' -v

echo "mysql logs"
docker logs ffp-mysql

echo "django logs"
docker logs ffp-django