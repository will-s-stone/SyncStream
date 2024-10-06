import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';

let client: MongoClient;

export let sessions: any;

if (env.MONGO_URL) {
	client = new MongoClient(env.MONGO_URL!);
	const database = client.db('SyncStream');
	sessions = database.collection('sessions');
}
