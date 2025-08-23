import { createClient } from "@supabase/supabase-js";

const dbConnect = () => {
  try {
    const supabaseUrl = "https://ejhmsuwymejibjeeffab.supabase.co";
    const supabaseKey = process.env.SUPABASE_KEY;

    const supabase = createClient(supabaseUrl, supabaseKey);

    if (supabase) {
      console.log("Database conected");
    } else {
      console.log("Database Not connected");
    }
  } catch (error) {
    console.log(`Database connection error ${error}`);
  }
};

export default dbConnect;
