import { supabase } from "../db/supabase.cnx.js";

export const LogRepository = {
	createLog: async ({
		method,
		endpoint,
		status_code,
		response_time_ms,
		ip_address,
	}) => {
		const { data, error } = await supabase.from("request_logs").insert([
			{
				method,
				endpoint,
				status_code,
				response_time_ms,
				ip_address,
			},
		]);

		if (error) {
			console.error("Error guardando log:", error);
			return null;
		}

		return data;
	},
};
