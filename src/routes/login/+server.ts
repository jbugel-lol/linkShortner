import { issueSessionToken } from "$lib/server";
import { error, json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
  const data = await request.json();
  const token = await issueSessionToken(data.password);

  if(!token.success) {
    throw error(403, "Forbidden");
  }
  
  cookies.set("session", token.session, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 31),
    path: "/",
  });
  return json({ success: true });
}
