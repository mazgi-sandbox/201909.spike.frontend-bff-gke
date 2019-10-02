#!/bin/bash -eu

readonly RESET=${1:-''}

if [[ $RESET = '--reset' ]]; then
  docker-compose run mysql mysql -h mysql -u root -e 'DROP DATABASE development'
fi
docker-compose run mysql mysql -h mysql -u root -e 'CREATE DATABASE IF NOT EXISTS development CHARACTER SET utf8mb4'
docker-compose run bff npm run typeorm migration:run
