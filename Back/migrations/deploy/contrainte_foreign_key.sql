-- Deploy TCG-Vision:contrainte_foreign_key to pg

BEGIN;

ALTER TABLE "deck"
  ALTER COLUMN "user_id" SET NOT NULL;

ALTER TABLE "collection"
  ALTER COLUMN "user_id" SET NOT NULL;

COMMIT;
