#!/bin/bash
docker-compose build

docker-compose up -d

cd functional-testing

yarn

yarn cypress run
