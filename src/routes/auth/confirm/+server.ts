import type { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "@sveltejs/kit";

export const GET = async ({ url, locals: { supabase } }) => {
	const params = url.searchParams;
	const tokenHash = params.get("token_hash") as string;
	const tokenType = params.get("type") as EmailOtpType;

	const { error } = await supabase.auth.verifyOtp({
		token_hash: tokenHash,
		type: tokenType,
	});
	if (error) throw error;

	return redirect(303, "/");
};
