import prisma from "$lib/server/prisma.js";
import { error, type RequestHandler } from "@sveltejs/kit";

export async function POST({ request, locals }) {
  if (!locals.session) return error(403);

  const data = await request.json();

  try {
    await prisma.url.update({
      data: {
        location: null
      },
      where: {
        id: data.id
      }
    })
    return new Response(null, { status: 200 })
  } catch (err) {
    return error(500, {
      message: "Failed to delete Record!"
    })
  }
}
