import bcrypt from "bcryptjs";
import { supabase } from "../db/supabase.cnx.js";

export const UserRepository = {
	create: async (userData) => {
		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(userData.password, saltRounds);

		const { data, error } = await supabase
			.from("usuarios")
			.insert([
				{
					nombre: userData.nombre,
					email: userData.email,
					password: passwordHash,
					role: userData.role || "user",
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
			.from("usuarios")
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
			.from("usuarios")
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
			.from("usuarios")
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
			.from("usuarios")
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
