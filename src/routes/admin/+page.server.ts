import { prisma } from "$lib/server/prisma.js";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, locals }) {
    if (!locals.session) return error(403);
    const pageSize = 25;

    const data = await prisma.url.findMany({
        take: pageSize,
        where: {
            location: {
                not: null
            }
        },
        orderBy: {
            created: "desc"
        }
    })

    const counted = await prisma.url.count({
        where: {
            location: {
                not: null
            }
        }
    });

    return {
        data,
        pageSize,
        countedUrls: counted
    };
}
