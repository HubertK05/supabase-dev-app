import { fail } from "@sveltejs/kit";

export const load = async ({ locals: { supabase }}) => {
    const { data: users, error } = await supabase.from("users").select(`id, email, todos ( id, name )`)
    if (error) throw error;
    console.log(users);
    return { users };
}

export const actions = {
    insertTodo: async ({ request, locals: { supabase, user }}) => {
        const formData = await request.formData();
        const name = formData.get("name") as string;

        if (!user) {
            return fail(403, { message: "User is not authenticated" });
        }

        const { error } = await supabase.from("todos").insert({ name, user_id: user.id });
        if (error) throw error;
    },
    updateTodo: async ({ request, locals: { supabase }}) => {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const todoId = formData.get("todoId") as string;

        const { error } = await supabase.from("todos").update({ name }).eq("id", todoId);
        if (error) throw error;
    },
    deleteTodo: async ({ request, locals: { supabase }}) => {
        const formData = await request.formData();
        const todoId = formData.get("todoId") as string;

        const { error } = await supabase.from("todos").delete().eq("id", todoId);
        if (error) throw error;
    }
}
