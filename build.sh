#!/bin/bash
set -e

docker network create -d bridge ffp-network

docker-compose build

docker-compose up -d
