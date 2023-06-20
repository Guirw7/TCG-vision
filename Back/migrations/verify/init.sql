-- Verify TCG-Vision:init on pg

BEGIN;

SELECT * FROM "user", "deck", "collection", "user_like_deck" WHERE false;

ROLLBACK;
