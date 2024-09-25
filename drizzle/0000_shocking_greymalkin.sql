-- Unfortunately, we need to add the foreign key constraint and view based on other schema ourselves.

CREATE TABLE IF NOT EXISTS "todos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"user_id" uuid NOT NULL,
	FOREIGN KEY (user_id) REFERENCES auth.users (id)
);

CREATE VIEW users AS SELECT id, email FROM auth.users;
