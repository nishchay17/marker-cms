import { index, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const repo = mysqlTable(
  "repos",
  {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    userId: varchar("userId", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (repo) => ({
    userIdIndex: index("repos__userId__idx").on(repo.userId),
  })
);
