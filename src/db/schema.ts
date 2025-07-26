import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const Messages = sqliteTable("messages", {
  id: text("id"),
  role: text("role"),
  content: text("content"),
  createdAt: integer("created_at", { mode: "timestamp" }),
})

export type MessageInsert = typeof Messages.$inferInsert
export type MessageSelect = typeof Messages.$inferSelect
