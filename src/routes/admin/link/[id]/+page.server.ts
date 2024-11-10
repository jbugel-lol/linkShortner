import prisma from "$lib/server/prisma";

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, locals, params }) {
    const link = await prisma.url.findFirst({ where: { id: params.id } });
    const visits = await prisma.visit.findMany({ where: { urlID: params.id }, take: 8 });

    return { ...link, visits };
};