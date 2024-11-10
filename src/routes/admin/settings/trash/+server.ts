import prisma from "$lib/server/prisma.js";
import { error, json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
    const data = await request.json();
    if (!locals.session) return error(403);

    let urls: string[] = data.urls;

    try {
        prisma.$transaction(async (tx) => {
            await tx.visit.deleteMany({
                where: {
                    urlID: {
                        in: urls
                    }
                }
            })

            await tx.url.deleteMany({
                where: {
                    id: {
                        in: urls
                    }
                }
            })
        })
    } catch (err) {
        console.error(err);
        return error(500);
    }
    return new Response(null, { status: 200 });
};

export async function GET({ request, locals }) {
    if (!locals.session) return error(403);
    const searchParams = new URL(request.url).searchParams;

    const page = searchParams.get("page") as string || "1";
    const size = searchParams.get("size") as string || "25";

    const urls = await prisma.url.findMany({
        where: { location: null },
        orderBy: { created: "desc" },
        skip: parseInt(size) * (parseInt(page) - 1),
        take: parseInt(size),
    });

    console.log(urls);
    return json({ urls });
};
