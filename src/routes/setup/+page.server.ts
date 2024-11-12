import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const check = await prisma.account.findFirst();
    if (check) {
        return redirect(302, "/");
    }
    return {
        exists: false
    };
};