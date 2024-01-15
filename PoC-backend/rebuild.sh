#!/bin/bash

docker rm poc-backend-nest-1
docker rmi poc-backend-nest
docker compose up
