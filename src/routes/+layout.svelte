<script>
	import "../app.css";

	export let data;
</script>

<div class="app">
	<header>
		<div>
			<a href="/">Home</a>
			<a href="/todos">Todos</a>
		</div>
		<div class="login-status">
			{#if data.user}
				<span>Logged in as: {data.user.email} ({data.user.id})</span>
				<form method="POST" action="/auth/logout">
					<button type="submit">Logout</button>
				</form>
			{:else}
				<span>Not logged in</span>
				<a class="header-not-first" href="/auth/login">Login</a>
			{/if}
		</div>
	</header>

	<main>
		<slot />
	</main>
</div>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
	}

	header :not(:first-child) {
		margin-left: 0.5rem;
	}

	.login-status {
		display: flex;
		align-items: center;
	}

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
