import prisma from "$lib/server/prisma.js";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ request }) {
    const data = await prisma.appsettings.findMany();
    if (data.length == 0 && new URL(request.url).pathname != "/setup") return redirect(302, "/setup");
    return {
        appSettings: data
    };
}