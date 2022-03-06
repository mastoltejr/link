<script lang="ts">
	interface Link {
		id: number;
		url: string;
		link: string;
	}

	let url = '';
	let link: Link | undefined;
	$: link = undefined;
	let copied = false;
	let errors: { [key: string]: string } = {};

	const getLink = async () => {
		const resp = await fetch('http://localhost:3001/createLink', {
			method: 'POST',
			body: JSON.stringify({ url, oldLinkId: link?.id }),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});

		if (resp.status === 200) {
			link = await resp.json();
			errors = {};
		} else {
			errors = await resp.json();
		}
	};

	const copy = async () => {
		if (link !== undefined)
			await navigator.clipboard.writeText(`https://link.stolte.us/${link.link}`).then(() => {
				copied = true;
			});
	};
</script>

<div class="card">
	<h3>Write or paste the URL to be shortened</h3>
	<div class="url-form cf">
		<input
			type="text"
			placeholder="https://example.link/with/a/long/url"
			required
			style="box-shadow:none"
			bind:value={url}
		/>
		<button on:click={getLink}>Shorten URL</button>
	</div>
	{#if !!errors?.url}<span class="error">{errors.url}</span>{/if}
	<p>
		Link! is a free tool to shorten a URL to an easy to remember link. Once you create your Link!
		save it as a bookmark in your browser or share it easily with friends. Anyone who uses the Link!
		will be forwarded to the original URL.
	</p>
</div>
{#if link !== undefined}
	<div class="card">
		<h3>Here's you're new Link!</h3>
		<div class="url-form cf" style="border: 2px solid {copied ? 'darkred' : 'transparent'}">
			<input disabled value="https://link.stolte.us/{link.link}" />
			<button on:click={copy}>Copy Link!</button>
		</div>
	</div>
{/if}

<style>
	.card {
		width: 100%;
		max-width: 600px;
		margin: 1rem auto;
		padding: 1rem 2rem;
		background: #fff;
		border-radius: 0.125rem;
		box-shadow: 0 0.125rem 0.3125rem 0 rgba(0, 0, 0, 0.25);
	}

	h3 {
		color: darkred;
		text-align: center;
	}

	p {
		line-height: 125%;
		color: rgb(66, 65, 65);
	}

	/*Clearing Floats*/
	.cf:before,
	.cf:after {
		content: '';
		display: table;
	}

	.cf:after {
		clear: both;
	}

	.cf {
		zoom: 1;
	}
	/* Form wrapper styling */

	.url-form {
		border-radius: 40px;
		background: transparent;
		box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.25);
		margin: 2rem auto;
		width: 80%;
		min-width: 325px;
		border: 2px solid transparent;
	}

	/* Form text input */

	.url-form input {
		padding: 10px 5px;
		padding-left: 20px;
		width: calc(100% - 110px);
		height: 20px;
		/* float: left; */
		/* font: bold 13px 'lucida sans', 'trebuchet MS', 'Tahoma'; */
		border: 0;
		background: #fff;
		border-radius: 40px;
		border-top-style: none;
		outline: none;
		margin-top: 10px;
		display: inline-block;
	}

	.url-form input:focus {
		outline: 0;
		background: #fff;
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.8) inset;
	}

	.url-form input::-webkit-input-placeholder {
		color: #999;
		font-weight: normal;
		font-style: italic;
	}

	.url-form input:-moz-placeholder {
		color: #999;
		font-weight: normal;
		font-style: italic;
	}

	.url-form input:-ms-input-placeholder {
		color: #999;
		font-weight: normal;
		font-style: italic;
		border-style: none;
	}

	/* Form submit button */
	.url-form button {
		overflow: visible;
		position: relative;
		float: right;
		border: 0;
		padding: 0;
		cursor: pointer;
		height: 40px;
		width: 110px;
		font: 13px/40px 'lucida sans', 'trebuchet MS', 'Tahoma';
		color: #fff;
		text-transform: uppercase;
		background: darkred;
		border-radius: 40px;
		text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.3);
	}

	.url-form button:hover {
		background: rgb(116, 0, 0);
	}

	.url-form button:focus:before,
	.url-form button:active:before {
		border-right-color: #c42f2f;
	}

	.url-form button::-moz-focus-inner {
		/* remove extra button spacing for Mozilla Firefox */
		border: 0;
		padding: 0;
	}
</style>
