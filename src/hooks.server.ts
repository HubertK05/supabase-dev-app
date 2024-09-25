import { createServerClient } from "@supabase/ssr";
import { redirect, type Handle } from "@sveltejs/kit";

import {
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { DATABASE_URL } from "$env/static/private";
import { sequence } from "@sveltejs/kit/hooks";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const supabase: Handle = async ({ event, resolve }) => {
	const pg = postgres(DATABASE_URL);
	event.locals.db = drizzle(pg);

	event.locals.supabase = createServerClient(
		PUBLIC_SUPABASE_URL,
		PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll: () => event.cookies.getAll(),
				setAll: (cookiesToSet) => {
					cookiesToSet.forEach(({ name, value, options }) => {
						event.cookies.set(name, value, {
							...options,
							path: "/",
						});
					});
				},
			},
		},
	);

	event.locals.safeGetSession = async () => {
		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession();
		if (!session) {
			return { session: null, user: null };
		}

		const {
			data: { user },
			error,
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			return { session: null, user: null };
		}

		return { session, user };
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return (
				name === "content-range" || name === "x-supabase-api-version"
			);
		},
	});
};

const authGuard: Handle = async ({ event, resolve }) => {
	const { session, user } = await event.locals.safeGetSession();
	event.locals.session = session;
	event.locals.user = user;

	if (!event.locals.session && ["/todos"].includes(event.url.pathname)) {
		redirect(303, "/auth/login");
	}

	return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard);
