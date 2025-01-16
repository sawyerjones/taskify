#!/bin/bash


source .env
cat src/db/schema.template.sql | sed "s/\${DB_USER}/$DB_USER/g" > src/db/schema.sql
echo "schema generated"