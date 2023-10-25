import { index, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const analytics = mysqlTable(
  "analytics",
  {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    redirectedFrom: varchar("redirectedFrom", { length: 255 }).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
  },
  (analytics) => ({
    userIdIndex: index("analytics__idx").on(analytics.created_at),
  })
);
