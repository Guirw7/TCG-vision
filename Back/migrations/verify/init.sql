-- Verify TCG-Vision:init on pg

BEGIN;

SELECT * FROM "user", "card", "deck", "collection", "user_like_deck", "deck_has_card" WHERE false;

ROLLBACK;
