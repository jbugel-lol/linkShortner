import prisma from "$lib/server/prisma.js";
import { detectDevice } from "$lib/utils.js";
import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, request }) {
  const id = params.linkID;
  const query = await prisma.url.findFirst({ where: { id } });

  if (query?.location) {
    const country = request.headers.get(import.meta.env.VITE_COUNTRY_HEADER) ?? null;
    const deviceType = detectDevice(request.headers.get("user-agent") ?? "unkown");
    await prisma.visit.create({
      data: {
        deviceType,
        country,
        urlID: id
      }
    })
    await prisma.url.update({
      where: { id }, data: {
        clicks: {
          increment: 1
        }
      }
    })
    return redirect(302, query.location);
  }

  throw error(404);
}
