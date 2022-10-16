#!/bin/bash
set -e

while (! (: </dev/tcp/localhost/8000) &> /dev/null || ! (: </dev/tcp/localhost/3000) &> /dev/null); do
    sleep 5;
    "waiting for django (locahost 8000) or react (locahost 3000)"
done

cd functional-testing

yarn

yarn cypress run
