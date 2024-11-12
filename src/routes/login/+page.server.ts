import prisma from "$lib/server/prisma";
import { generateRandomId } from "$lib/utils";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import bcrypt from 'bcrypt';

export async function load({ request, locals, cookies }) {
  if (new URL(request.url).searchParams.get("expired")) return { expired: true };
  if (cookies.get("session")) return redirect(302, "/admin");
};

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();

    const username = data.get("username") as string | null;
    if (!username) return fail(400, {
      success: false,
      message: "Missing Username!"
    })

    const password = data.get("password") as string | null;
    if (!password) {
      return fail(400, {
        success: false,
        message: "Missing Password!"
      })
    }

    const mfacode = data.get("MFACODE") as string | null;

    const user = await prisma.account.findUnique({
      where: {
        username:
          username.toLowerCase(),
      }
    })
    if (!user) return AuthError();

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) return AuthError();

    if (user.MFAToken) {

    }

    const token = generateRandomId(32);
    const query = await prisma.session.create({
      data: {
        accountID: user.id,
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

function AuthError() {
  return fail(400, {
    success: false,
    message: "Unable to Authenticate"
  })
}