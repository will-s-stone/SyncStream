<script lang="ts">
	import { browser } from '$app/environment';
	import ShortUniqueId from 'short-unique-id';

	let acceptableCharacters = 'ABCDEFGHGJLMNPQRSTUVWXYZ0123456789';
	const { randomUUID } = new ShortUniqueId({
		dictionary: acceptableCharacters.split(''),
		length: 6
	});

	let roomCode = '';
	function join() {
		if (roomCode == '') {
			alert('Please enter a room code...');
		} else {
			if (browser) window.location.href = `/room/${roomCode}`;
		}
	}

	async function createRoom() {
		const code = randomUUID();
		if (browser) window.location.href = `/room/${code}`;
	}

	function formValidation() {
		console.log(roomCode);
		roomCode = roomCode.toUpperCase();
		roomCode = roomCode
			.split('')
			.filter((x) => acceptableCharacters.includes(x))
			.join('');
		if (roomCode.length > 6) {
			roomCode = roomCode.substring(0, roomCode.length - 1);
		}
	}
</script>

<div class="w-screen h-screen font-sans flex flex-col items-center justify-center">
	<h1 class="text-5xl mb-20 mx-40">Peer Stream</h1>
	<div id="centered content" class="grid grid-cols-2 gap-y-5 gap-x-5 w-fit item-center">
		<input
			bind:value={roomCode}
			on:input={formValidation}
			placeholder="Enter a Code"
			class="bg-white/75 focus:placeholder-transparent outline-none focus:border-slate-500 focus:bg-white border-slate-400 border-2 col-start-1 col-end-3 h-[70px] text-[40px] text-center"
		/>
		<button
			on:click={join}
			class="border px-4 text-xl rounded bg-moonstone-100 hover:bg-moonstone-200 transition active:bg-moonstone-300 row-start-2 row-end-3 col-start-1 col-end-2 p-2"
			>Join</button
		>
		<button
			class="border rounded px-4 text-xl bg-tangerine-400 hover:bg-tangerine-500 transition active:bg-tangerine-600 row-start-2 row-end-3 col-start-2 col-end-3 p-2"
			on:click={createRoom}>Create Room</button
		>
	</div>
</div>
