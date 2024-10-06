import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"
import { StatusCodes } from "$lib/StatusCodes";
import { sessions } from "$lib/mongo";

type Session = {
  _id: string
  room_id: string,
  peer_id: string
}

export const load: PageServerLoad = async ({ params }) => {
  const id = params.id;
  if (id.length != 6) error(StatusCodes.NOT_FOUND);

  const query: unknown = await sessions.findOne({ room_id: id });
  if (query) {
    return {
      room_id: (query as Session).room_id,
      peer_id: (query as Session).peer_id,
      host: false
    }
  }

  return {
    room_id: id,
    peer_id: null,
    host: true
  }
}

export const actions = {
  "make-room": async ({ request, params }) => {
    const data = await request.formData();
    const peer_id = data.get("peer_id");
    const room_id = params.id;

    if (!peer_id || typeof peer_id != 'string' || !room_id) {
      error(StatusCodes.BAD_REQUEST)
    }

    const query = await sessions.findOne({ room_id });
    if (query) {
      return;
    }

    const session = { room_id, peer_id }
    sessions.insertOne(session);
  },
  "delete-room": async ({ params }) => {
    const room_id = params.id;

    if (!room_id) {
      error(StatusCodes.BAD_REQUEST)
    }

    await sessions.deleteOne({ room_id });
  }
}