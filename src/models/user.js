import { supabase } from "../configs/dbConnect.js";

class UserModel {
  static table = "users";

  static async create(user) {
    // Always hash password before calling this method!
    const { data, error } = await supabase
      .from(this.table)
      .insert([user])
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  }

  static async findAll() {
    const { data, error } = await supabase.from(this.table).select("*");

    if (error) throw new Error(error.message);
    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from(this.table)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async findByUsername(username) {
    const { data, error } = await supabase
      .from(this.table)
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id, updates) {
    updates.updated_at = new Date().toISOString(); // keep updated_at fresh
    const { data, error } = await supabase
      .from(this.table)
      .update(updates)
      .eq("id", id)
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  }

  static async delete(id) {
    const { error } = await supabase.from(this.table).delete().eq("id", id);

    if (error) throw new Error(error.message);
    return true;
  }
}

export default UserModel;
