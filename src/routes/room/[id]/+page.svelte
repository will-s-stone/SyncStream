<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Peer, { type DataConnection } from 'peerjs';
	import { type Message, isFullVideo, isSeek, isPlayerStatus, isVideoRequest } from '$lib/protocol';

	export let data: PageData;

	const host = data.host;

	let peer: Peer;
	let peerId: string;
	let uploadedArrayBuffer: ArrayBuffer | null = null;
	let fileUploaded: boolean = false;
	let video: HTMLVideoElement;
	let videoSource: string;

	let slider: HTMLInputElement;
	let duration = 0;
	let currentTime = 0;

	// Media Commands
	let playPause: () => void = console.log;
	let seek: (seconds: number) => void = console.log;

	const openRoom = async () => {
		const body = new FormData();
		body.set('peer_id', peerId);
		await fetch('?/make-room', {
			body,
			method: 'POST'
		});
	};

	const closeRoom = async () => {
		const body = new FormData();
		body.set('peer_id', peerId);
		await fetch('?/delete-room', {
			body,
			method: 'POST'
		});
	};

	const processCommand = async (msg: Message) => {
		console.log('Processing Command: ' + msg);
		if (isPlayerStatus(msg)) {
			if (msg.data == 'play') {
				video.play();
			} else {
				video.pause();
			}
		} else if (isSeek(msg)) {
			video.currentTime = msg.data;
		} else if (isFullVideo(msg)) {
			uploadedArrayBuffer = msg.data;
			videoSource = URL.createObjectURL(new Blob([msg.data]));
		}
	};

	onMount(() => {
		peer = new Peer();

		peer.on('open', async (id) => {
			peerId = id;

			if (host) {
				openRoom();
				const connections: { con: DataConnection; id: number }[] = [];

				// Register command listeners
				playPause = () => {
					const e: Message = {
						type: 'player',
						data: video.paused ? 'play' : 'pause'
					};
					console.log(e);
					for (const c of connections) {
						c.con.send(e);
					}
					processCommand(e);
					const seek: Message = {
						type: 'seek',
						data: currentTime
					};
					for (const c of connections) {
						c.con.send(seek);
					}
					processCommand(seek);
				};
				seek = (sec: number) => {
					const e: Message = {
						type: 'seek',
						data: sec
					};
					console.log(e);
					for (const c of connections) {
						c.con.send(e);
					}
					processCommand(e);
				};

				peer.on('connection', (con) => {
					// Setup open and close events
					const id = connections.length;
					connections.push({ id, con });
					con.on('close', () => connections.filter((x) => x.id != id));

					con.on('data', (e) => {
						console.log('received data from peer');

						console.log(e);
						console.log(connections);

						// Broadcast all other messages globally
						for (const c of connections) {
							c.con.send(e);
						}
						processCommand(e as Message);
					});

					setTimeout(() => {
						console.log('Sending Video Data');
						con.send('test');
						con.send({
							type: 'fullVideoMessage',
							data: uploadedArrayBuffer
						});
					}, 500);
				});
			}

			// Connect if not the host
			if (!host) {
				// Register command listeners
				playPause = () => {
					const e: Message = {
						type: 'player',
						data: video.paused ? 'play' : 'pause'
					};
					console.log(e);
					connection.send(e);
					const seek: Message = {
						type: 'seek',
						data: currentTime
					};
					connection.send(seek);
				};
				seek = (sec: number) => {
					const e: Message = {
						type: 'seek',
						data: sec
					};
					console.log(e);
					connection.send(e);
				};

				const hostPeerId = data.peer_id;
				if (!hostPeerId) return;

				const connection = peer.connect(hostPeerId);

				// Wait 5 seconds to connect to the room, otherwise delete the room
				const timeout = setTimeout(closeRoom, 5000);
				connection.on('open', () => clearTimeout(timeout));

				// Close room if host disconnects
				connection.on('close', closeRoom);
				connection.on('data', (data) => {
					console.log(data);
					processCommand(data as Message);
				});
			}
		});
	});

	const seekVideo = () => {
		const seekTime = Number(slider.value);
		seek(seekTime);
	};

	const handleFileUpload = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			const file = input.files[0];
			console.log('File uploaded:', file);

			// Create a FileReader to read the file as an ArrayBuffer
			const reader = new FileReader();

			reader.onload = (e) => {
				if (e.target?.result) {
					uploadedArrayBuffer = e.target.result as ArrayBuffer; // Store the ArrayBuffer
					// console.log('ArrayBuffer:', uploadedArrayBuffer);
					// Mark file as uploaded
					fileUploaded = true;
					videoSource = URL.createObjectURL(file);
				}
			};

			reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
		}
	};

	const fullscreen = () => {
		video.requestFullscreen();
	};
</script>

<svelte:head>
	<title>
		Room {data.room_id}
	</title>
</svelte:head>
{data.room_id}

<!-- To do:
    1. Add Media player
    2. Sync times of media player 
 -->

{#if host}
	You are the host'
	{#if !fileUploaded}
		<input type="file" on:change={handleFileUpload} />
	{/if}
{:else}
	You are not the host
{/if}

<center>
	<div class="">
		{#if videoSource}
			<video
				id="video"
				bind:duration
				src={videoSource}
				bind:this={video}
				class="flex items-center justify-center flex-shrink-0 w-auto h-auto"
				on:timeupdate={() => {
					currentTime = video.currentTime;
					duration = video.duration || 0;
				}}
			>
				<track kind="captions" />
			</video>
		{/if}

		<input
			type="range"
			bind:this={slider}
			min="0"
			max={duration}
			value={currentTime}
			on:input={seekVideo}
		/>
		<div id="controls" class="justify-center">
			<button id="playPauseBtn" class="bg-tangerine rounded px-4 py-2" on:click={playPause}
				>Play/Pause</button
			>

			<button id="fullscreenBtn" class="bg-[#B2BEB5] rounded px-4 py-2" on:click={fullscreen}
				>Fullscreen</button
			>
		</div>
	</div>
</center>
<!-- Remove -->
