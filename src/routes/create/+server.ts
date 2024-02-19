import {
  databaseRequest,
  connection,
  validateSessionToken,
  generateRandomId,
} from "$lib/server";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
  const data = await request.json();
  let id: string | null;

  if (data.linkID) {
    id = generateRandomId(8);
  } else {
    id = data.linkID;
  }

  if (!(await validateSessionToken(cookies.get("session") ?? "XX")))
    throw error(403, "Forbidden");

  const query = await databaseRequest(
    `INSERT INTO urls (id,url,created) VALUES (${connection.escape(
      id
    )},${connection.escape(data.url)},${Date.now()})`
  );

  if (query.error) {
    return new Response(
      JSON.stringify({
        error: query.error,
        status: 500,
      }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      id,
      url: data.url,
      clicks: 0,
      status: 200,
    }),
    { status: 200 }
  );
}
