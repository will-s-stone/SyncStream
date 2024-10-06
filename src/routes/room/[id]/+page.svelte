<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Peer, { type DataConnection } from 'peerjs';

	export let data: PageData;

	const host = data.host;

	let value: string;
	let peer: Peer;
	let peerId: string;

	let click: () => void;

	onMount(() => {
		peer = new Peer();

		peer.on('open', async (id) => {
			peerId = id;

			// Send room to mongo with peer id if host
			if (host) {
				const body = new FormData();
				body.set('peer_id', peerId);
				await fetch('?/make-room', {
					body,
					method: 'POST'
				});

				const connections: DataConnection[] = [];
				peer.on('connection', (e) => {
					connections.push(e);
					console.log('Open!');
					e.on('close', () => console.log('Closed'));
					e.on('data', (e) => {
						console.log(e);
						console.log(connections);
						for (const c of connections) {
							c.send(e);
						}
					});
				});

				click = () => {
					console.log(value);
					for (const c of connections) {
						c.send(value);
					}
				};
			}

			// Connect if not the host
			if (!host) {
				const hostPeerId = data.peer_id;
				if (!hostPeerId) return;

				const connection = peer.connect(hostPeerId);

				// Wait 5 seconds to connect to the room, otherwise delete the room
				const timeout = setTimeout(async () => {
					const body = new FormData();
					body.set('peer_id', peerId);
					await fetch('?/delete-room', {
						body,
						method: 'POST'
					});
				}, 5000);
				connection.on('open', () => {
					clearTimeout(timeout);
				});

				connection.on('data', console.log);

				click = () => {
					connection.send(value);
				};
			}
		});
	});
</script>

<svelte:head>
	<title>
		Room {data.room_id}
	</title>
</svelte:head>

<!-- To do:
    1. Add Media player
    2. Sync times of media player 
 -->

{#if host}
	You are the host
{:else}
	You are not the host
{/if}

<input type="text" bind:value />
<button on:click={click}>Send</button>
{data.room_id}
