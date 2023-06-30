-- Revert TCG-Vision:contrainte_foreign_key from pg

BEGIN;

ALTER TABLE "deck"
  ALTER COLUMN "user_id" DROP NOT NULL;

ALTER TABLE "collection"
  ALTER COLUMN "user_id" DROP NOT NULL;

COMMIT;
