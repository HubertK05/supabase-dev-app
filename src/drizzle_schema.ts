import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
	id: uuid("id").defaultRandom().notNull().primaryKey(),
	name: text("name").notNull(),
	userId: uuid("user_id").notNull(),
});
