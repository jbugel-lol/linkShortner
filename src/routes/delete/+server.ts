import { databaseRequest, connection, validateSessionToken } from "$lib/server";
import { json, error } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
  const data = await request.json();
  
  if (!await validateSessionToken(cookies.get("session"))) throw error(403, "Forbidden");

  const query = await databaseRequest(
    "DELETE FROM urls WHERE id = " + connection.escape(data.id)
  );


  if (query.error) {
    return new Response(
      JSON.stringify({
        success: false,
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
