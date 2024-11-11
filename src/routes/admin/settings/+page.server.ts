/** @type {import('./$types').PageServerLoad} */
export async function load({ request, locals }) {
    return {
        countryCodeDetected: request.headers.get(import.meta.env.VITE_COUNTRY_HEADER) != null
    };
};