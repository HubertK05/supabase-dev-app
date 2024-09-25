<script>
	import "../app.css";

	export let data;
</script>

<div class="app">
	<header>
		{#if data.user}
			Logged in as: {data.user.email} ({data.user.id})
		{:else}
			Not logged in
		{/if}
	</header>

	<main>
		<slot />
	</main>
</div>

<style>
	header {
		padding: 1rem;
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
