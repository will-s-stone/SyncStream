import { MongoClient } from "mongodb";
import { env } from "$env/dynamic/private"

const client = new MongoClient(env.MONGO_URL!)

const database = client.db("SyncStream");
export const sessions = database.collection("sessions")
