import {index, integer, real, sqliteTable, text, uniqueIndex} from "drizzle-orm/sqlite-core";
import {sql} from "drizzle-orm";

export const users = sqliteTable(
    'users',
    {
        id: text('id').primaryKey(),
        email: text('email').unique().notNull(),
        name: text('name'),
        picture: text('picture'),

        createdAt: integer('created_at',{ mode: 'timestamp_ms' }).default(sql`CURRENT_TIMESTAMP`),
        updatedAt: integer('updated_at',{ mode: 'timestamp_ms' }).default(sql`CURRENT_TIMESTAMP`),
    },
    (users)=> ({
        emailIdx: uniqueIndex('email_idx').on(users.email),
    })
);