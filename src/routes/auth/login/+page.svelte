<script lang="ts">
	export let form;
</script>

<form method="POST" action="?/login">
	<input name="email" type="email" placeholder="email" />
	<input name="password" placeholder="password" />
	<button type="submit">Login</button>
</form>

<form method="POST" action="?/sendMagicLink">
	<input name="email" type="email" placeholder="email" />
	<button type="submit">Send me a magic link</button>
</form>

<form method="POST" action="?/github">
	<button type="submit">Login with GitHub</button>
</form>

<a href="/auth/register">No account? Register here</a>

{#if form?.message}
	{form.message}
{/if}
