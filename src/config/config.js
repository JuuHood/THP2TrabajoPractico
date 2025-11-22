// src/config/config.js
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || "localhost",
  DB_PATH: process.env.DB_PATH || "./src/db/receta.db.json",

  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_KEY: process.env.SUPABASE_KEY,

  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key",

  BASIC_AUTH_USER: process.env.BASIC_AUTH_USER,
  BASIC_AUTH_PASS: process.env.BASIC_AUTH_PASS,
};

// Cliente de Supabase
export const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_KEY);
