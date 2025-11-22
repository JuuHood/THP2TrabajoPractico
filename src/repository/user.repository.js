import { supabase } from "../config/config.js";
import bcrypt from 'bcrypt';

export const UserRepository = {
  create: async (userData) => {
    // Hashear contraseña antes de almacenar
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(userData.password, saltRounds);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          username: userData.username,
          email: userData.email,
          password_hash: passwordHash,
          role: userData.role || 'user',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  },

  getByEmail: async (email) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  },

  updateById: async (id, newData) => {
    const { data, error } = await supabase
      .from("users")
      .update(newData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  },

  deleteById: async (id) => {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      return null;
    }

    if (!data || data.length === 0) {
      return null;
    }

    return id;
  },
};