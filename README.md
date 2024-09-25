# Supabase sveltekit app example

> IMPORTANT: Due to SSR being used in the application, an SSR client has to be set up (this is done here in the `src/hooks.server.js` file and root `+layout.*` files). Also, auth uses the Supabase's built-in PKCE flow. This affects some settings, listed below in this file.

## Confusing URLs:

### Development

-   Frontend url or site url: something like `http://localhost:5173`
-   Supabase API url or API url: something like `http://localhost:54321`
-   Database url: something like `postgresql://postgres:postgres@127.0.0.1:54322/postgres`

### Production

-   Frontend url or site url: something like `https://supabase-dev-app.vercel.app/` if using Vercel as the hosting service
-   Supabase API url or API url: something like `https://[your-project-id].supabase.co`
-   Database url: something like `postgresql://postgres.[your-project-id]:[your-password]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`

## During development

-   Supabase is hosted using Docker containers - required to run locally.
-   Inbucket is a tool that receives emails normally sent to a user - available after `supabase start`
-   Supabase studio is basically the Supabase dashboard but hosted locally, with limited features - available after `supabase start`

## Environment variables and settings

They appear in the `.env.example` file - feel free to copy the template into `.env`. `.env.local` does not work with Supabase CLI though.

### Settings checklist and important notes:

OAuth2:

-   add this project to the provider
-   Site url: based on the frontend url, no path, but with trailing slash
-   Callback url: based on the Supabase API url, **NOT FRONTEND URL!!** - in production you can copy from Supabase settings
-   add client id, secret and **enable** the appropriate provider.
-   settings for production differ from those from development - create separate OAuth2 app in the provider's page
-   additionally, due to PKCE flow, you have to add the final callback URL - it's the path in the frontend (like `/auth/callback`) - this is the only URL to be added to the allow list.

SMTP:

-   set custom SMTP
-   probably increase interval between sent mails and increase rate limits in Supabase dashboard settings in production
-   password for Gmail's SMTP can be created in [](https://myaccount.google.com/apppasswords)
-   replace default templates with special templates designed for PKCE flow:
-   in development add `.html` file containing the template and link it in `config.toml` file, under the `[auth.email.template.<template name\>\] -> content_path` section
-   in production there is a dedicated setting for mail templates

Drizzle ORM:

-   **Does not work with RLS, this is being worked on by the Drizzle ORM team**
-   Here, Drizzle ORM uses the database url env var

## SvelteKit boilerplate below

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
