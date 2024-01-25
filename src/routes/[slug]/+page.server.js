import { connection, databaseRequest } from "$lib/server";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const id = params.slug;

  const query = await databaseRequest(
    "SELECT * FROM urls WHERE id = " + connection.escape(id)
  );

  if (!query.results[0] || query.error) {
    redirect(302, import.meta.env.VITE_ERROR_DOMAIN);
  }
  databaseRequest(
    "UPDATE urls SET clicks = clicks + 1 WHERE id = " + connection.escape(id)
  );
  redirect(302, query.results[0].url);
  return {};
}
