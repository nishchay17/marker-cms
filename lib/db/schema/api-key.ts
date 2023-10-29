import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import * as z from "zod";

export const apiKey = mysqlTable("api-key", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const apiKeyInsertSchema = createInsertSchema(apiKey)
  .pick({ name: true })
  .transform((v) => ({
    name: v.name.split(" ").join("-"),
  }));

export type apiKeyInsertType = z.infer<typeof apiKeyInsertSchema>;
