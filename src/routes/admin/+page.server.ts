import { databaseRequest, validateSessionToken } from "$lib/server";
import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  if (!cookies.get("session")) throw redirect(302, "/login");
  if (!await validateSessionToken(cookies.get("session") ?? "XX")) throw redirect(302, "/login");

  const query = await databaseRequest("SELECT urls.id, urls.url, COUNT(clicks.id) AS clicks FROM urls LEFT JOIN clicks ON urls.id = clicks.link GROUP BY urls.id, urls.url;");
  const data = Object.values(JSON.parse(JSON.stringify(query.results)));
  
  return {
    data,
  };
}
