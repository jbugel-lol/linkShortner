import { prisma } from "$lib/server/prisma";

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, locals }) {
    const pageSize = 25;
    const urls = await prisma.url.findMany({ where: { location: null }, take: pageSize, orderBy: { created: "desc" } });

    const countedUrls = await prisma.url.count({ where: { location: null } });

    return { urls, pageSize, countedUrls };
};