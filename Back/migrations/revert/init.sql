-- Revert TCG-Vision:init from pg

BEGIN;

DROP TABLE "user", "collection", "deck", "card", "collection_has_card", "deck_has_card";

COMMIT;
