import { Peer } from 'peerjs';

const peerIdInput = document.getElementById('roomId') as HTMLInputElement;
const connectBtn = document.getElementById('joinBtn') as HTMLButtonElement;

const peer = new Peer();

peer.on('open', (id) => {
	console.log('Peer ID: ' + id);
});

peer.on('connection', (conn) => {
	conn.on('data', (data) => {
		console.log('Received:', data);
	});
});

connectBtn.addEventListener('click', () => {
	const peerId = peerIdInput.value;

	if (peerId) {
		const conn = peer.connect(peerId);

		conn.on('open', () => {
			console.log('Connection established with ' + peerId);

			// Send a message
			conn.send('Hello from ' + peer.id);

			// Listen for messages
			conn.on('data', (data) => {
				//messagesDiv.innerHTML += `<p>Received: ${data}</p>`;
			});
		});

		conn.on('error', (err) => {
			console.error('Connection error:', err);
		});
	} else {
		alert('Please enter a Peer ID.');
	}
});