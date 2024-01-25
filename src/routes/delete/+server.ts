import { password, databaseRequest, connection } from "$lib/server";
import { json, error } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
  const data = await request.json();
  if (cookies.get("Password") !== password) throw error(403, "Forbidden");

  const query = await databaseRequest(
    "DELETE FROM urls WHERE id = " + connection.escape(data.id)
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
    success: true,
  });
}
