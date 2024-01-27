import { databaseRequest, validateSessionToken } from "$lib/server";
import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  if (!cookies.get("session")) throw redirect(302, "/login");
  if (!await validateSessionToken(cookies.get("session"))) throw redirect(302, "/login");

  const query = await databaseRequest("SELECT * FROM urls");
  const data = Object.values(JSON.parse(JSON.stringify(query.results)));

  return {
    data,
  };
}
