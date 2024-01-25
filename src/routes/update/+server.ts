import { password, databaseRequest, connection } from "$lib/server";
import { error, json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function PATCH({ request, cookies }) {
  const data = await request.json();

  if (cookies.get("Password") !== password) throw error(403, "Forbidden");

  const query = await databaseRequest(
    "UPDATE urls SET url = " +
      connection.escape(data.newURL) +
      " WHERE id = " +
      connection.escape(data.id)
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

  return json({
    newURL: data.newURL,
  });
}
