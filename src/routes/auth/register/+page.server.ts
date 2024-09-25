export const actions = {
    register: async ({ request, locals: { supabase }}) => {
        const formData = await request.formData();
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
    },
}