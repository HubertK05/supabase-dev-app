export const actions = {
    sendMagicLink: async ({ request, locals: { supabase }}) => {
        const formData = await request.formData();
        const email = formData.get("email") as string;

        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;
    }
}
