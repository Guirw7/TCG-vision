-- Verify TCG-Vision:init on pg

BEGIN;

SELECT * FROM "user", "collection", "deck", "card", "collection_has_card", "deck_has_card" WHERE false;

ROLLBACK;
