import { databaseRequest, password } from "$lib";
import { error, json } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  if (cookies.get("Password") !== password) throw error(403, "Forbidden");

  const query = await databaseRequest("SELECT * FROM urls");
  const data = Object.values(JSON.parse(JSON.stringify(query.results)));

  return {
    data,
  };
}
