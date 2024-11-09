import prisma from "$lib/server/prisma";
import { generateRandomId } from "$lib/utils";
import { error, json, type Actions } from "@sveltejs/kit";


export async function GET({ request, locals }) {
    if (!locals.session) return error(403);
    const searchParams = new URL(request.url).searchParams;

    const page = searchParams.get("page") as string;
    const size = searchParams.get("size") as string;
    const includeDeletedParam = searchParams.get("includeDeleted");
    let includeDeleted = includeDeletedParam != null ? parseInt(includeDeletedParam) == 1 ? true : false : false;

    if (!page || !size) return error(400, {
        message: "Missing Pagination Parameters (page, size, includeDeleted)"
    })

    const urls = await prisma.url.findMany({
        where: {
            ...(includeDeleted ? {} : {
                location: {
                    not: null
                }
            })
        },
        orderBy: {
            created: "desc"
        },
        take: parseInt(size),
        skip: parseInt(size) * (parseInt(page) - 1)
    })

    return json({ ...urls })
}

export async function POST({ request, locals }) {
    if (!locals.session) return error(403);

    const data = await request.json();

    let url: string | null = validateAndPrefixUrl(data.url);


    if (!url) {
        error(400, {
            message: "Bad Url Submitted!"
        })
    }

    let id: string = data.linkID ? data.linkID : generateRandomId(8);

    try {
        const link = await prisma.url.create({
            data: {
                clicks: 0,
                id,
                location: url
            }
        })
        return json({
            ...link
        }, {
            status: 200
        })
    } catch (err) {
        error(500, {
            message: "Unable to Insert Link"
        })
    }
}

export async function DELETE({ request, locals }) {
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

function validateAndPrefixUrl(url: string): string | null {
    const pattern = /^(https?:\/\/)/i;
    if (!pattern.test(url)) {
        url = `https://${url}`;
    }
    const validUrl = new URL(url);
    return validUrl ? validUrl.toString() : null;
}