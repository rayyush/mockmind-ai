import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_i7Pt5qEuhgHC@ep-hidden-snowflake-a8h73w98-pooler.eastus2.azure.neon.tech/MockMindai?sslmode=require",
  },
});
