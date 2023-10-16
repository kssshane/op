FROM postgres:16-alpine

# Custom initialization scripts
ADD  ddl.sql /docker-entrypoint-initdb.d
COPY ddl.sql ddl.sql

RUN chmod +x /docker-entrypoint-initdb.d/ddl.sql