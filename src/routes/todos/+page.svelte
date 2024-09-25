<script lang="ts">
	export let data;
</script>

<form method="POST" action="?/insertTodo">
	<input name="name" placeholder="name" />
	<button type="submit">Create todo</button>
</form>

{#each data.users as user}
	{#if user.todos.length != 0}
		<p>Id: {user.id}</p>
		<p>Email: {user.email}</p>
		<div>
			<h2>Todos:</h2>
			{#each user.todos as todo (todo.id)}
				<p>Todo {todo.id}</p>
				<p>Name: {todo.name}</p>

				<form method="POST" action="?/updateTodo">
					<input name="name" placeholder="name" />
					<input name="todoId" value={todo.id} hidden />
					<button type="submit">Update</button>
				</form>

				<form method="POST" action="?/deleteTodo">
					<input name="todoId" value={todo.id} hidden />
					<button type="submit">Delete</button>
				</form>
			{/each}
		</div>
	{/if}
{/each}
