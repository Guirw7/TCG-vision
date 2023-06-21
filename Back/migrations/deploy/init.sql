-- Deploy TCG-Vision:init to pg

BEGIN;

CREATE TABLE "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "username" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);


CREATE TABLE "deck" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "deck_name" TEXT NOT NULL,
  "deck_description" TEXT,
  "card_quantity" INT,
  "set_code" INT,
  "user_id" INT REFERENCES "user"("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "collection" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "collection_name" TEXT NOT NULL,
  "set_code" INT,
  "card_quantity" INT,
  "user_id" INT REFERENCES "user"("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_like_deck" (
  "user_id" INT REFERENCES "user"("id"),
  "deck_id" INT REFERENCES "deck"("id"),
  "counter_like" INT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

COMMIT;
