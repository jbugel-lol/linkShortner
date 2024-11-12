import prisma from '$lib/server/prisma.js';
import { generateRandomId } from '$lib/utils.js';
import { redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {

    const data = await request.json();
    const { name, domain, proxy_header, username, password } = data;

    let hash = bcrypt.hashSync(password, 10);

    const account = await prisma.account.create({
        data: {
            username: username.toLowerCase(),
            password: hash,
            role: "ADMIN"
        }
    })

    const session = await prisma.session.create({
        data: {
            id: generateRandomId(32),
            validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 31),
            accountID: account.id
        }
    })

    cookies.set("session", session.id, {
        expires: session.validUntil,
        path: "/",
    })

    await prisma.$transaction(async (tx) => {
        await tx.appsettings.create({
            data: {
                id: "name",
                value: name
            }
        })
        await tx.appsettings.create({
            data: {
                id: "domain",
                value: domain
            }
        })
        await tx.appsettings.create({
            data: {
                id: "proxy_header",
                value: proxy_header
            }
        })
    })

    return new Response(null, { status: 200 });
};