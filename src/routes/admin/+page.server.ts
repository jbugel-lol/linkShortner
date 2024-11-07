import prisma from "$lib/server/prisma.js";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, locals }) {
    if (!locals.session) return error(403);
    const country = request.headers.get(import.meta.env.VITE_COUNTRY_HEADER) ?? null;
    const pageSize = 50;

    const data = await prisma.url.findMany({
        take: pageSize,
        where: {
            location: {
                not: null
            }
        },
        orderBy: {
            created: "desc"
        },
        include: {
            _count: {
                select: { visit: true }
            }
        }
    })

    const counted = await prisma.url.count();

    return {
        data,
        country_code_detected: country != null,
        pageSize,
        countedUrls: counted
    };
}
