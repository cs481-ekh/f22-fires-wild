#!/bin/bash
set -e

cd functional-testing

yarn

yarn cypress run
