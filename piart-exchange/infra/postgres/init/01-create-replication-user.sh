#!/usr/bin/env bash
set -euo pipefail

: "${POSTGRES_REPLICATION_USER:?POSTGRES_REPLICATION_USER is required}"
: "${POSTGRES_REPLICATION_PASSWORD:?POSTGRES_REPLICATION_PASSWORD is required}"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" \
  --set=replication_user="$POSTGRES_REPLICATION_USER" \
  --set=replication_password="$POSTGRES_REPLICATION_PASSWORD" <<'SQL'
DO
$$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = :'replication_user') THEN
    EXECUTE format(
      'CREATE ROLE %I WITH REPLICATION LOGIN PASSWORD %L',
      :'replication_user',
      :'replication_password'
    );
  END IF;
END
$$;
SQL
