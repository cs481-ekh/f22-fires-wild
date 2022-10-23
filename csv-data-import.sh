#!/bin/bash
set -e

csv=$1

echo "Transferring source files. This may take a while on a full dataset (5-10 minutes)"

docker cp ./sql/createtable.sql ffp-mysql:./var/lib/mysql-files/

docker cp ./sql/$csv ffp-mysql:./var/lib/mysql-files/


echo "Transfer complete."

# we need to wait for the db connection to be open before we can run the import
# chose this solution because it is self-contained (didn't want to create a healthcheck on the container for this)
# https://stackoverflow.com/a/48703384/16610401
waitcount=1
while ! docker exec -i ffp-mysql mysql -uroot -pmysql-root-password -e "status" &> /dev/null ; do
    if (( waitcount > 10 )); then
        # we waited too long
        exit 1
    fi 
    echo "waiting for database connection..."
    sleep 5
    let waitcount=waitcount+1 
done   

# echo "editing mysql bind address"
# docker exec -i ffp-mysql sed -i "s/.*bind-address.*/bind-address = 0.0.0.0/" /etc/my.cnf

# escaping the " symbol sux so I use var
dqt='"'

echo "Creating table and importing data. This may take a while on a full dataset (20-30 minutes)"
# https://stackoverflow.com/a/39720988/16610401
docker exec -i ffp-mysql mysql -uroot -pmysql-root-password  <<< "use ffp-mysql-db; source /var/lib/mysql-files/createtable.sql; LOAD DATA INFILE '/var/lib/mysql-files/${csv}' IGNORE INTO TABLE FPA_FOD_PLUS FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '${dqt}' LINES TERMINATED BY '\n' IGNORE 1 LINES SET CONT_DATE = date_format(str_to_date(CONT_DATE, '%m/%d/%Y %T'), '%Y-%m-%d %T');"

#./progress-spinner.sh docker exec -i ffp-mysql mysql -uroot -pmysql-root-password  <<< "use ffp-mysql-db; source /var/lib/mysql-files/createtable.sql;"

# docker exec -i ffp-mysql mysql -uroot -pmysql-root-password  <<<""

# check to ensure that database is populated
# count=$(docker exec -i ffp-mysql mysql -uroot -pmysql-root-password  <<< "use ffp-mysql-db; select COUNT(FPA_ID) from FPA_FOD_PLUS")
# while [[ $count != *"251"* ]]; do
#     echo "waiting for database population..."
#     echo "$count"
#     sleep 2
#     count=$(docker exec -i ffp-mysql mysql -uroot -pmysql-root-password  <<< "use ffp-mysql-db; select COUNT(FPA_ID) from FPA_FOD_PLUS")
# done

# req'd because it takes time to run the command that isn't reflected here, admittedly inaccurate :(
# NOTE: if you see failures in pipeline, could be that slowdown caused this to not complete before restart
# to fix, increment this sleep 
# sleep 5
echo "data import complete"

echo "restarting mysql and django containers to re-initialize connection"
# here we have to restart the mysql container because of change to bind address
docker restart ffp-mysql

# wait again after restart
waitcount=1
while ! docker exec -i ffp-mysql mysql -uroot -pmysql-root-password -e "status" &> /dev/null ; do
    if (( waitcount > 10 )); then
        # we waited too long
        exit 1
    fi 
    echo "waiting for database connection..."
    sleep 5
    let waitcount=waitcount+1 
done

# here we have to restart the django container to re-init the conne
docker restart ffp-django

# HACK test what's going on with the containers
# sleep 10
# echo "networks:"
# docker network ls

# echo "docker ps:"
# docker ps -a   

# echo "docker inspect -f:"
# docker inspect -f '{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)

# HACK try curl to the heatmap endpoint

# echo "GET localhost:8000 heatmap"
# curl -XGET 'http://localhost:8000/api/heatmap/' -v

# echo "GET 127.0.0.1:8000 heatmap"
# curl -XGET 'http://127.0.0.1:8000/api/heatmap/' -v

# echo "mysql logs"
# docker logs ffp-mysql

# echo "django logs"
# docker logs ffp-django