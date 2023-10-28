import { index, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as z from "zod";

export const repo = mysqlTable(
  "repos",
  {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    userId: varchar("userId", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (repo) => ({
    userIdIndex: index("repos__userId__idx").on(repo.userId),
  })
);

export const repoInsertSchema = createInsertSchema(repo).pick({ name: true });

export type repoInsertType = z.infer<typeof repoInsertSchema>;

export const repoSelectSchema = createSelectSchema(repo);
export type repoSelectType = z.infer<typeof repoSelectSchema>;
