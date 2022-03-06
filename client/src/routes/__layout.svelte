<script lang="ts">
</script>

<nav>
	<div id="title">Link!</div>
	<div id="links">
		<!-- <a href="/">Create</a> -->
		<!-- <a href="/links">My Links</a> -->
	</div>
</nav>
<slot />

<style>
	nav {
		height: 48px;
		background-color: darkred;
		color: white;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 12px 24px;
		box-sizing: border-box;
		box-shadow: 0 10px 8px -4px rgba(0, 0, 0, 0.2);
		margin-bottom: 32px;
	}
	#title {
		font-weight: 400;
		font-size: 1.4rem;
	}
	#links {
		height: 48px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	a {
		color: white;
		text-decoration: none;
		font-size: 1.1rem;
		padding: calc(24px - 0.55rem) 16px;
		height: 48px;
		box-sizing: border-box;
		transition: all 0.25s;
		cursor: 'pointer';
	}
	/* a:hover {
		background-color: white;
		color: darkred;
	} */
</style>
