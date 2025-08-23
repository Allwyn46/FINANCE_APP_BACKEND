import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = "https://ejhmsuwymejibjeeffab.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

// Create a single global client
const supabase = createClient(supabaseUrl, supabaseKey);

const dbConnect = () => {
  try {
    if (supabase) {
      console.log("✅ Database connected");
    } else {
      console.log("❌ Database not connected");
    }
  } catch (error) {
    console.log(`Database connection error: ${error}`);
  }
};

export { dbConnect, supabase };
