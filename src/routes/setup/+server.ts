import { createSQLLiteDB, prisma } from '$lib/server/prisma';
import { generateRandomId } from '$lib/utils.js';
import bcrypt from 'bcrypt';

import fs from 'fs';
import path from 'path';
import { finishSetup } from '../../hooks.server.js';


/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
    const data = await request.json();
    const { name, domain, proxy_header, username, password, database_url } = data;

    const envData = {
        PUBLIC_APP_NAME: name,
        PUBLIC_COUNTRY_HEADER: proxy_header,
        PUBLIC_URL: domain,
        PUBLIC_DOMAIN: domain,
        DATABASE_URL: database_url
    }

    fs.writeFileSync(path.join(process.cwd(), ".env"), Object.entries(envData)
        .map(([key, value]) => `${key.toUpperCase()}="${value}"`)
        .join("\n"), "utf8");

    await createSQLLiteDB();

    let hash = bcrypt.hashSync(password, 10);
    try {
        const transaction = await prisma?.$transaction(async (tx) => {
            const account = await tx.account.create({
                data: {
                    username: username.toLowerCase(),
                    password: hash,
                    role: "ADMIN"
                }
            })
            const session = await tx.session.create({
                data: {
                    id: generateRandomId(32),
                    validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 31),
                    accountID: account.id
                }
            })

            return { account, session };
        })

        cookies.set("session", transaction?.session.id ?? "NULL", {
            expires: transaction?.session.validUntil,
            path: "/",
        })
    } catch (error) {
        console.log(error);
    }

    finishSetup();
    return new Response(null, { status: 200 });
};