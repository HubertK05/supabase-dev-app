import { redirect } from "@sveltejs/kit";

export const POST = async ({ locals: { supabase } }) => {
	let { error } = await supabase.auth.signOut();
	if (error) throw error;
	return redirect(303, "/");
};
