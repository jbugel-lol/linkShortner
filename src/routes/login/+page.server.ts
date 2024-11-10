import prisma from "$lib/server/prisma";
import { generateRandomId } from "$lib/utils";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export async function load({ request, locals, cookies }) {
  if (new URL(request.url).searchParams.get("expired")) return { expired: true };
  if (cookies.get("session")) return redirect(302, "/admin");
};

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const password = data.get("password") as string | null;

    if (!password || password !== import.meta.env.VITE_ADMIN_PASSWORD) {
      return fail(400, {
        success: false,
        message: "Missing Password!"
      })
    }

    const token = generateRandomId(32);
    const query = await prisma.session.create({
      data: {
        id: token,
        validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 31)
      }
    })

    cookies.set("session", query.id, {
      expires: query.validUntil,
      path: "/",
    });

    return redirect(302, "/admin");
  }
} satisfies Actions;