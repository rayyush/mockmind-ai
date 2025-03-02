import { serial, text, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mock_interview", {
  // ✅ Use snake_case for table name
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition", 255).notNull(),
  jobDesc: varchar("jobDesc", 1000).notNull(),
  jobExp: varchar("jobExp", 255).notNull(),
  createdBy: varchar("createdBy", 255).notNull(),
  createdAt: varchar("createdAt", 255),
  mockId: varchar("mockId", 255).notNull(),
});
