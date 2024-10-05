<<<<<<< HEAD
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

<div class=" bg- w-screen h-screen text-B5E2FA">

<h1 class="text-xl flex flex-col justify-center items-center">Enter a room code</h1>
<div id="centered content" class="flex justify-center items-center min-h-screen">
<input bind:value={roomCode} placeholder="Room Code" class="border ">
<button on:click={join} class="border bg-slate- px-4 rounded">Join</button> 
<button class="border rounded px-4" on:click={createRoom}>Create Room</button>
</div>
</div>
=======
<h1 class="bg-moon">Enter a room code</h1>
<input />
<button>Join</button>

<button>Create Room</button>
>>>>>>> 51c23182a1d001a94bfcdc7ab635f865506b6770
