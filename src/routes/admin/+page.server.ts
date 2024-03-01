import { databaseRequest, validateSessionToken } from "$lib/server";
import type { Link } from "$lib/types";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  if (!cookies.get("session")) throw redirect(302, "/login");
  if (!await validateSessionToken(cookies.get("session") ?? "XX")) throw redirect(302, "/login");

  // const query = await databaseRequest("SELECT urls.id, urls.url, urls.created, COUNT(clicks.id) AS clicks FROM urls LEFT JOIN clicks ON urls.id = clicks.link GROUP BY urls.id, urls.url;");
  
  const query = await databaseRequest(`
      SELECT 
        urls.id,
        urls.url,
        urls.created,
        CONCAT('{', GROUP_CONCAT(CONCAT('"', country, '": ', click_count)), '}') AS country_clicks,
        total_clicks.clicks
    FROM 
        urls
    LEFT JOIN (
        SELECT 
            link,
            country,
            COUNT(*) AS click_count
        FROM 
            clicks 
        GROUP BY 
            link, country
    ) AS click_counts ON urls.id = click_counts.link
    LEFT JOIN (
        SELECT 
            link,
            COUNT(*) AS clicks
        FROM 
            clicks 
        GROUP BY 
            link
    ) AS total_clicks ON urls.id = total_clicks.link
    GROUP BY 
        urls.id, urls.url, urls.created, total_clicks.clicks;
  `)
  
  const data: Link[] = Object.values(JSON.parse(JSON.stringify(query.results)));

  return {
    data,
  };
}
