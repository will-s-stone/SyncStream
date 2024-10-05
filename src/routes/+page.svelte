<script lang="ts">
	let acceptableCharacters = 'ABCDEFGHGJLMNPQRSTUVWXYZ0123456789';

	let roomCode = '';
	function join() {
		if (roomCode == '') {
			alert('Please enter a room code...');
		} else {
			alert('Joining the the room: ' + roomCode);
		}
	}

	function createRoom() {
		alert('creating room...');
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

<h1 class="text-4xl flex flex-col justify-center items-center">Enter a room code</h1>
<div class="w-screen h-screen font-sans flex items-center justify-center">
	<div id="centered content" class="grid grid-cols-2 gap-y-5 gap-x-5 w-fit item-center">
		<input
			bind:value={roomCode}
			on:input={formValidation}
			placeholder="Enter a Code"
			class="bg-white/75 focus:placeholder-transparent outline-none focus:border-slate-500 focus:bg-white border-slate-400 border-2 col-start-1 col-end-3 h-[70px] text-[40px] text-center"
		/>
		<button
			on:click={join}
			class="border px-4 rounded bg-moonstone-100 hover:bg-moonstone-200 transition active:bg-moonstone-300 row-start-2 row-end-3 col-start-1 col-end-2 p-2"
			>Join</button
		>
		<button
			class="border rounded px-4 bg-tangerine-400 hover:bg-tangerine-500 transition active:bg-tangerine-600 row-start-2 row-end-3 col-start-2 col-end-3 p-2"
			on:click={createRoom}>Create Room</button
		>
	</div>
</div>
