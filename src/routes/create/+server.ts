import { password, databaseRequest, connection } from "$lib";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
  const data = await request.json();
  const id = data.linkID ?? generateRandomId(data.length);

  if (cookies.get("Password") !== password) throw error(403, "Forbidden");

  // INSERT INTO urls (id,url,clicks) VALUES (${data.linkID,data.url})
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
      id: import.meta.env.VITE_DOMAIN + "/" + id,
      url: data.url,
      clicks: 0,
      status: 200,
    }),
    { status: 200 }
  );
}

function generateRandomId(length: number) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomId = "";

  length = length ?? 8;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}
