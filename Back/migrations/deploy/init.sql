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

CREATE TABLE "collection" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "collection_name" TEXT NOT NULL,
  "card_name" TEXT NOT NULL,
  "card_set" TEXT NOT NULL,
  "card_quantity" INT NOT NULL,
  "user_id" INT REFERENCES "user"("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "deck" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "card_name" TEXT NOT NULL,
  "deck_description" TEXT,
  "creator_username" TEXT NOT NULL,
  "card_quantity" INT NOT NULL,
  "like_counter" INT,
  "user_id" INT REFERENCES "user"("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "set_code" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "collection_has_card" (
  "collection_id" INT REFERENCES "collection"("id"),
  "card_id" INT REFERENCES "card"("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "deck_has_card" (
  "deck_id" INT REFERENCES "deck"("id"),
  "card_id" INT REFERENCES "card"("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMIT;