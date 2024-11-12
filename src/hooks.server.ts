
import prisma from "$lib/server/prisma";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
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