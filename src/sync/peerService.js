// peerService.js
import Peer from 'peerjs';

class PeerService {
	constructor() {
		this.peer = null;
		this.connection = null;
		this.listeners = {
			open: [],
			connection: [],
			data: [],
			error: []
		};
	}

	init() {
		this.peer = new Peer();

		this.peer.on('open', (id) => {
			this._triggerListeners('open', id);
		});

		this.peer.on('connection', (conn) => {
			this.connection = conn;
			this._setupConnection();
			this._triggerListeners('connection', conn);
		});

		this.peer.on('error', (error) => {
			this._triggerListeners('error', error);
		});
	}

	connect(peerId) {
		if (this.peer) {
			this.connection = this.peer.connect(peerId);
			this._setupConnection();
		}
	}

	sendMessage(message) {
		if (this.connection) {
			this.connection.send(message);
		}
	}

	on(event, callback) {
		if (this.listeners[event]) {
			this.listeners[event].push(callback);
		}
	}

	_setupConnection() {
		this.connection.on('open', () => {
			this._triggerListeners('connection', this.connection);
		});

		this.connection.on('data', (data) => {
			this._triggerListeners('data', data);
		});
	}

	_triggerListeners(event, data) {
		if (this.listeners[event]) {
			this.listeners[event].forEach(callback => callback(data));
		}
	}

	destroy() {
		if (this.peer) {
			this.peer.destroy();
		}
	}
}

export const peerService = new PeerService();