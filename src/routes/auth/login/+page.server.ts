import { fail, redirect } from "@sveltejs/kit";

export const actions = {
    sendMagicLink: async ({ request, locals: { supabase }}) => {
        const formData = await request.formData();
        const email = formData.get("email") as string;

        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;
    },
    github: async ({ locals: { supabase } }) => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: "/auth/callback"
            }
        });
        if (error) throw error;

        if (data.url) {
            redirect(302, data.url);
        } else {
            return fail(400, { message: "Missing url" });
        }
    }
}
