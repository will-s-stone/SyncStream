<!-- PeerComponent.svelte -->
<script>
	import { onMount, onDestroy } from 'svelte';
	import { peerService } from './peerService.js';

	let peerId = '';
	let connectionId = '';
	let messages = [];

	onMount(() => {
		peerService.init();

		peerService.on('open', (id) => {
			peerId = id;
		});

		peerService.on('connection', () => {
			messages = [...messages, { type: 'info', content: 'Connection established' }];
		});

		peerService.on('data', (data) => {
			messages = [...messages, { type: 'received', content: data }];
		});

		peerService.on('error', (error) => {
			console.error('PeerJS error:', error);
			messages = [...messages, { type: 'error', content: error.toString() }];
		});
	});

	onDestroy(() => {
		peerService.destroy();
	});

	function connectToPeer() {
		if (connectionId) {
			peerService.connect(connectionId);
		}
	}

	function sendMessage() {
		peerService.sendMessage('Hello from Svelte PeerJS!');
		messages = [...messages, { type: 'sent', content: 'Hello from Svelte PeerJS!' }];
	}
</script>

<main>
	<h1>PeerJS Svelte Example</h1>
	<p>Your Peer ID: {peerId}</p>
	<input bind:value={connectionId} placeholder="Peer ID to connect to" />
	<button on:click={connectToPeer}>Connect</button>
	<button on:click={sendMessage}>Send Message</button>

	<div>
		{#each messages as message}
			<p class={message.type}>{message.content}</p>
		{/each}
	</div>
</main>

<style>
    .sent { color: blue; }
    .received { color: green; }
    .error { color: red; }
    .info { color: gray; }
</style>