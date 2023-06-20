-- Revert TCG-Vision:init from pg

BEGIN;

DROP TABLE "user", "deck", "collection", "user_like_deck";

COMMIT;
