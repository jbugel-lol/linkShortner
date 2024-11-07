import prisma from "$lib/server/prisma.js";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, locals }) {
    if (!locals.session) return error(403);
    const country = request.headers.get(import.meta.env.VITE_COUNTRY_HEADER) ?? null;

    const data = await prisma.url.findMany({
        take: 50,
        where: {
            location: {
                not: null
            }
        },
        include: {
            _count: {
                select: { visit: true }
            }
        }
    })

    return {
        data,
        country_code_detected: country != null
    };
}
