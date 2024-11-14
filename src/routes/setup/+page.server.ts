import { redirect } from '@sveltejs/kit';
//@ts-ignore
import { PUBLIC_APP_NAME, PUBLIC_COUNTRY_HEADER, PUBLIC_URL, PUBLIC_DOMAIN } from "$env/static/public"
//@ts-ignore
import { DATABASE_URL } from '$env/static/private';
import { prisma } from '$lib/server/prisma';
import { AccountRole } from '$lib/types';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    let account = null;
    try {
        account = await prisma.account.findFirst({
            where: {
                role: AccountRole.ADMIN
            }
        });
    } catch (error) {
        console.log("No Database Found!");
    }

    let envExists = false
    if (PUBLIC_APP_NAME && PUBLIC_COUNTRY_HEADER && PUBLIC_URL && PUBLIC_DOMAIN && account && DATABASE_URL) {
        envExists = true
    }

    let accountExists = false
    if (account) {
        accountExists = true
    }

    if (envExists && accountExists) {
        throw redirect(307, "/");
    }

    return {
        envExists,
        accountExists,
        envData: {
            PUBLIC_APP_NAME,
            PUBLIC_COUNTRY_HEADER,
            PUBLIC_URL,
            PUBLIC_DOMAIN,
            DATABASE_URL
        },
        accountData: {
            username: account?.username ?? null,
        }
    };
};