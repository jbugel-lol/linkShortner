import { redirect } from "@sveltejs/kit";

export const POST = async ({ cookies }) => {
    // Set the session cookie to expire in the past
    cookies.set("session", "", {
        expires: new Date(0), // January 1, 1970
        path: "/",
    });

    // Redirect to the login page
    throw redirect(302, "/");
};