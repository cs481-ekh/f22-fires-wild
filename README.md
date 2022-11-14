# FPA-FOD-Plus Website

<img src="img/ffp_logo.png" width="40%"></img>
<img src="img/ffp_logo_dark.png" width="40%"></img>
<img src="img/sdp_logo_fire.png" width="20%"></img>

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

[![Build and Test](https://github.com/cs481-ekh/f22-fires-wild/actions/workflows/build-test.yml/badge.svg)](https://github.com/cs481-ekh/f22-fires-wild/actions/workflows/build-test.yml)

# Build & Run

## React hot reload for developing locally

Volume mapping causes failure on the react container in github actions. To re-enable (which also enables hot reload) uncomment the following in `docker-compose.yml`:
```yml

ffp-react:
    ...
    # uncomment these lines to enable hot reload ;)
    # volumes:
    # - ./fire-react-app/:/app/frontend
    ...

```

## Environment Variables
Contained in the `.env` file are environment variables used for building the project. `.env` naming is what docker compose expects. The following variables should be set within in order for your environment to work:

- HOST_API_PORT - This needs to be an open port on the host machine. The API container will recieve requests on this port.
- HOST_WEB_PORT - This needs to be an open port on the host machine. The web container will recieve requests on this port.
- MYSQL_DATABASE - should be `ffp-mysql-db`
- MYSQL_USER - username for the API. default is `mysql-user`. No real reason to change this.
- MYSQL_PASSWORD - :warning: SECRET VALUE :warning: - Set this to a strong password and store it somewhere safe. This is the password used to access the MySQL database by the API
- MYSQL_ROOT_PASSWORD - :warning: SECRET VALUE :warning: - Set this to a strong password and store it somewhere safe. This is the password used to access the MySQL database by Docker, and YOU, if need be.
- MYSQL_DATABASE_HOST - should be `ffp-mysql`
- MYSQL_DATABASE_PORT - should be `3306`. any access from the host machine is managed by port mapping and NOT environment variables.
- MYSQL_TCP_PORT - should be `3306`. any access from the host machine is managed by port mapping and NOT environment variables.
- DJANGO_API_ROUTE - the API container's root web path. default is `f22-fires-wild/api/` (which is what cypress expects)
- DJANGO_API_URL - the fully qualified URL of the API container WITHOUT the route above. Locally this MUST be `http://localhost:<HOST_API_PORT>/`
- REACT_WEB_ROUTE - base web path for the website (no trailing `/`). this can be blanked out to have the website hosted at `/`

## Clean install (or clean refresh)

When you make changes to the project, you will need to re-build the docker containers before your changes will be reflected in the docker project.

From the root project directory:

- `$ docker-compose down`
  - this will stop the currently running insance of the project. This will not delete associated app volumes.
    - if you would like to delete the volumes (INCLUDING THE DB AND ALL DATA), you may add the `-v` paramter.

- `./build.sh`
  - this will re-build the context and run the docker stack detached from the console

## Troubleshooting

- Django container error: `django.db.utils.OperationalError: (2003, "Can't connect to MySQL server on 'ffp-mysql' ([Errno 111] Connection refused)")`
  - The mysql container is not usually initialized the first time before the django container tries to access it. to solve this, you can restart just the django container in Docker desktop, or try running `$ docker-compose down` (NO `-v`) then `$ docker-compose up`. This can also be accomplished by stopping the Django container and restarting it using Docker Desktop.

## Importing Data

### Automatically

- To import data as csv (please note the .csv file MUST be located in the /sql/ folder):
    `./csv-data-import.sh <name-of-csv-file>.csv`

- To import sample sql statements
    `./sample-data-import.sh`

### Manually

Below are the manual steps to import data into the sql container. Failing to follow the following steps can prevent data from being successfully imported. 

- Build and run the docker container outlned in the Clean install section of this README

- First: Upload create table statement and csv file into the sql container:
  - `$ docker cp ./sql/createtable.sql ffp-mysql:./var/lib/mysql-files/`
  
- This next step requires you to upload our data. There are two ways of doing so. We have a small, 250 sample insert statement script, then we have a CSV file we will import our data from. The small insert statement script is intended to be used for testing, while importing from a CSV is meant more for production. 

  - To import the insert statements, copy the insert statement SQL script with the following command:
    - `$ docker cp ./sql/sample_create_insert_statements.sql ffp-mysql:./var/lib/mysql-files/`
    
  - To import our data from a CSV file, use the following copy script:
    - `$ docker cp ./sql/[csv_name].csv ffp-mysql:./var/lib/mysql-files/`
  
- Second: Enter the mySQL CLI and login as the root user (This can be done in Docker Desktop)
  - `$ mysql -u root -p -h localhost`
  - Enter the password when prompted

- Use existing database created by docker-compose file:
  - `USE ffp-mysql-db`
 
- Run the create table script
  - `mysql> source /var/lib/mysql-files/createtable.sql`
  
- Import data from the CSV file OR run insert statement script

  - To import using our SQL script, run the following command:
    - `mysql> source /var/lib/mysql-files/sample_create_insert_statements.sql`
  
  - To import the data from the CSV file
    - `mysql> LOAD DATA INFILE '/var/lib/mysql-files/[csv_name].csv' IGNORE INTO TABLE [table_name] FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES SET CONT_DATE = date_format(str_to_date(CONT_DATE, '%m/%d/%Y %T'), '%Y-%m-%d %T');`
    - A message showing number of records created, deleted, or skipped will show when done.
    - `SHOW WARNINGS;` can be done to show any warnings generated
  
- Troubleshooting
  - You may need to restart the ffp-django container to establish connection to the database
  - If you can't run the `LOAD DATA INFILE` command, try running `mysql> SELECT @@GLOBAL.secure_file_priv;` command and try again.

# Attention Future Developers!

### Work that can be done:
- [ ] Implement a feature where the user can create a polygon on the map, the coordinates to that polygon are ran through a point-in-polygon algorithm, and all points within that polygon are displayed. A useful resource to use might be: https://lvngd.com/blog/point-in-polygon-search-with-geodjango/
- [ ] Implement a graph feature where rather than outputting the points on a map, the site would return a graph with particular input. 
- A simple example might be a line graph with number of fires in said location over time. 
- A more interesting implementation might be a pie chart with percent of fires by state/county.
- An even more interesting implementation of the graph might be a scatter plot considering some of the sponsor's added fire attributes to help the user discover potential trends.
- [ ] Implement a feature where you could view all 250+ attributes of a specific record by entering a FOD/FPA ID.
- [ ] Implement a feature where you can upload data to the database. Ensuring that duplicates are not made.
- [ ] Implement a feature where an administrator is able to modify the current database with the addition/deletion of a row. 
- [ ] Implement a feature where an administrator is able to modify the values of a specific searched record or able to modify all values of a specific attribute.
- The Django Admin feature handles this but on a very small scale.
- [ ] Implement a PDF uploader for the About page.
- This way any pertinent documents can be easily accessed associated with improving the website/underestanding the goal of the website.
- [ ] We plan on deploying the webpage to the sponsor's server but if this is not tackled by us by the end of the semester, this may be one of the first things to tackle.

### Work Needed:
- [ ] Implement a new UI testing suite. We tested our UI before revamping it before the end of the project and needed to disable quite a few tests. At this point a brand new test suite can be created. We used Cypress.
- [ ] Continue to tell the development story of the features you implemented and what needs to be done when you hand off this project to the next team.
- [ ] Implement a feature to open external links in About page in new 
- [ ] Remove unused dependencies and funcitons from the project.
# Attributions:

- [Django MySQL Docker Sample - Sergei Konik](https://skonik.me/setup-django-with-mysql-using/)
- [Fire Emoji - Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Noto_Emoji_KitKat_1f525.svg)
- [Unutterable Font](https://fontesk.com/unutterable-font/)
