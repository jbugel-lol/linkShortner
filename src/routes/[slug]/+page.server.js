import { connection, databaseRequest } from "$lib/server";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, request }) {
  const id = params.slug;
  const country = request.headers.get("CF-IPCountry") ?? "XX"

  const query = await databaseRequest(
    "SELECT * FROM urls WHERE id = " + connection.escape(id)
  );

  if (!query.results[0] || query.error) {
    return redirect(302, import.meta.env.VITE_ERROR_DOMAIN);
  }

  databaseRequest(`INSERT INTO clicks(country, timestamp, link) VALUES (${connection.escape(country)}, ${Date.now()}, "${id}");`)
  redirect(302, query.results[0].url);
}
