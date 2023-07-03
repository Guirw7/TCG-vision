-- Verify TCG-Vision:contrainte_foreign_key on pg

BEGIN;

SELECT "conname"
FROM "pg_constraint"
WHERE "conname" = 'deck_user_id_not_null'
  AND "conrelid" = 'deck'::regclass;

SELECT COUNT(*)
FROM "deck"
WHERE "user_id" IS NULL;

SELECT "conname"
FROM "pg_constraint"
WHERE "conname" = 'collection_user_id_not_null'
  AND "conrelid" = 'collection'::regclass;

SELECT COUNT(*)
FROM "collection"
WHERE "user_id" IS NULL;

ROLLBACK;
