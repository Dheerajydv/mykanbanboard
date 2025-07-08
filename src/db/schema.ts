import { STATUS_CONSTANTS } from "@/constants";
import { boolean, integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", STATUS_CONSTANTS)

export const taskTable = pgTable("task_table", {
    id: uuid("id").primaryKey().defaultRandom(),
    taskTitle: text("task_title").notNull(),
    clerkUserId: text("clerk_user_id").notNull(),
    status: statusEnum("status").notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().$onUpdate(() => new Date())
})