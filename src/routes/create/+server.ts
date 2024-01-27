import { databaseRequest, connection, validateSessionToken, generateRandomId } from "$lib/server";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
  const data = await request.json();
  let id: string | null;
    
  if(data.linkID < 1) {id = generateRandomId(8)} else {
    id = data.linkID
  };

  if (!await validateSessionToken(cookies.get("session"))) throw error(403, "Forbidden");

  const query = await databaseRequest(
    `INSERT INTO urls (id,url,clicks) VALUES (${connection.escape(
      id
    )},${connection.escape(data.url)},0)`
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
