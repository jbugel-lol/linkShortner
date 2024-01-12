import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
  const data = await request.json();
  cookies.set("Password", data.password, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 31),
    path: "/",
  });

  return json({ success: true });
}
