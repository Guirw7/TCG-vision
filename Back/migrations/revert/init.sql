-- Revert TCG-Vision:init from pg

BEGIN;

DROP TABLE "user", "card", "deck", "collection", "user_like_deck", "deck_has_card";

COMMIT;
