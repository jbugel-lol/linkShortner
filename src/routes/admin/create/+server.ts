import prisma from "$lib/server/prisma.js";
import { generateRandomId } from "$lib/utils.js";
import { error, json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies, locals }) {
  if (!locals.session) return error(403);

  const data = await request.json();
  let id: string = data.linkID ? data.linkID : generateRandomId(8);

  try {
    await prisma.url.create({
      data: {
        clicks: 0,
        id,
        location: data.url
      }
    })

    return json({
      id,
      url: data.url,
      clicks: 0
    })
  } catch (err) {
    error(500, {
      message: "Unable to Insert Link"
    })
  }
}
