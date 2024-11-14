
//@ts-ignore
import { DATABASE_URL } from "$env/static/private";
import { prisma } from "$lib/server/prisma";
import { redirect, type Handle } from "@sveltejs/kit";

export let setupFinished: boolean = true;
if (!DATABASE_URL) {
    setupFinished = false
}

export function finishSetup() {
    setupFinished = true
}

export const handle: Handle = async ({ event, resolve }) => {
    if (!setupFinished && event.url.pathname !== "/setup") return redirect(307, "/setup");

    const url: URL = new URL(event.url);

    if (url.pathname.startsWith("/admin")) {
        const session = event.cookies.get("session");

        if (!session) {
            return redirect(307, "/login");
        }
        const user = await prisma.session.findFirst({
            where: {
                id: session,
                AND: {
                    validUntil: {
                        gt: new Date()
                    }
                }
            },
            include: {
                account: true
            }
        })

        if (!user || user.account.role !== "ADMIN") {
            event.cookies.delete("session", {
                path: "/"
            });
            return redirect(307, "/login?expired=true");
        }

        //@ts-ignore
        event.locals.session = user;
    }

    return await resolve(event);
}