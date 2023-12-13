import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {bots, trades, users} from "./schema";
import {SQLiteTable} from "drizzle-orm/sqlite-core/table";

export const InsertUserSchema = createInsertSchema(users as SQLiteTable);
export const SelectUserSchema = createSelectSchema(users as SQLiteTable);
export const InsertBotSchema = createInsertSchema(bots as SQLiteTable);
export const SelectBotSchema = createSelectSchema(bots as SQLiteTable);

export const InsertTradeSchema = createInsertSchema(trades as SQLiteTable);
export const SelectTradeSchema = createSelectSchema(trades as SQLiteTable);

/// types

// export type CreateNewUser = InferInsertModel<typeof users>;
// export type CreateNewBot = InferInsertModel<typeof bots>;
// export type CreateNewTrade = InferInsertModel<typeof trades>;
//
// export type SelectUser = InferSelectModel<typeof users>;
// export type SelectBot = InferSelectModel<typeof bots>;
// export type SelectTrade = InferSelectModel<typeof trades>;

export type CreateNewUser = typeof users.$inferInsert;
export type CreateNewBot = typeof bots.$inferInsert;
export type CreateNewTrade = typeof trades.$inferInsert;

export type SelectUser = typeof users.$inferSelect;
export type SelectBot = typeof bots.$inferSelect;
export type SelectTrade = typeof trades.$inferSelect;