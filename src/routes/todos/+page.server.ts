import { fail } from "@sveltejs/kit";
import { todos } from "../../drizzle_schema";
import { eq } from "drizzle-orm";

export const load = async ({ locals: { db, user }}) => {
    if (!user) {
        throw Error("User is not authenticated");
    }

    const fetchedTodos = await db.select().from(todos).where(eq(todos.userId, user.id));
    return { todos: fetchedTodos };
}

export const actions = {
    insertTodo: async ({ request, locals: { db, user }}) => {
        const formData = await request.formData();
        const name = formData.get("name") as string;

        if (!user) {
            return fail(403, { message: "User is not authenticated" });
        }

        await db.insert(todos).values({ name, userId: user.id });
    },
    updateTodo: async ({ request, locals: { db }}) => {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const todoId = formData.get("todoId") as string;

        await db.update(todos).set({ name }).where(eq(todos.id, todoId));
    },
    deleteTodo: async ({ request, locals: { db }}) => {
        const formData = await request.formData();
        const todoId = formData.get("todoId") as string;

        await db.delete(todos).where(eq(todos.id, todoId));
    }
}
