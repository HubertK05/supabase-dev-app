import { error, fail, redirect } from "@sveltejs/kit";

export const GET = async ({ url, locals: { supabase } }) => {
    const params = url.searchParams;
    
    const code = params.get("code") as string;
    const next = params.get("next") ?? "/";

    if (!code) throw error(400, "Missing OAuth2 authorization code");

    const { error: codeError } = await supabase.auth.exchangeCodeForSession(code)
    if (codeError) throw error(400, "Invalid OAuth2 authorization code");

    throw redirect(303, `/${next.slice(1)}`);
}
