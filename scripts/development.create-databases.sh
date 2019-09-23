#!/bin/bash -eu

docker-compose run mysql mysql -h mysql -u root -e 'CREATE DATABASE development CHARACTER SET utf8mb4'
