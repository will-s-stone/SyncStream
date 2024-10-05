<script>
    let roomCode = '';
    function join() {
        if(roomCode == '') {
        alert("Please enter a room code...")
    } else {
        alert("Joining the the room")
    } 
}

    function createRoom() {
        alert("creating room...")
    }
</script>

<div class=" bg-vanilla-100 w-screen h-screen text">

<h1 class="text-xl flex flex-col justify-center items-center">Enter a room code</h1>
<div id="centered content" class="flex justify-center items-center min-h-screen">
<input bind:value={roomCode} placeholder="Room Code" class="border ">
<button on:click={join} class="border bg-slate- px-4 rounded bg-moonstone-100">Join</button> 
<button class="border rounded px-4 bg-tangerine-500" on:click={createRoom}>Create Room</button>
</div>
</div>