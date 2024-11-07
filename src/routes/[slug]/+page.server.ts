import prisma from "$lib/server/prisma.js";
import { detectDevice } from "$lib/utils.js";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, request }) {
  const id = params.slug;
  const country = request.headers.get(import.meta.env.VITE_COUNTRY_HEADER) ?? null;
  const deviceType = detectDevice(request.headers.get("user-agent") ?? "unkown");

  const query = await prisma.url.findFirst({ where: { id } });

  if (query?.location) {
    await prisma.visit.create({
      data: {
        deviceType,
        country,
        urlID: id
      }
    })
    return redirect(302, query.location);
  }

  return redirect(302, import.meta.env.VITE_ERROR_DOMAIN);
}
