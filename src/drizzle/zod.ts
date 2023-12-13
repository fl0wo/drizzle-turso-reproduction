import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {users} from "./schema";
import {SQLiteTable} from "drizzle-orm/sqlite-core/table";

export const InsertUserSchema = createInsertSchema(users as SQLiteTable);
export const SelectUserSchema = createSelectSchema(users as SQLiteTable);
/// types

// export type CreateNewUser = InferInsertModel<typeof users>;
// export type SelectUser = InferSelectModel<typeof users>;

export type CreateNewUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;