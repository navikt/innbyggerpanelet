#!/bin/bash

set -e
set -u

for db in $(echo $POSTGRES_DATABASES | tr ',' ' '); do
  USER="${db}-user"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	CREATE USER "$USER" WITH password '$POSTGRES_PASSWORD';
	CREATE DATABASE "$db";
	GRANT ALL PRIVILEGES ON DATABASE "$db" TO "$USER";
EOSQL
done