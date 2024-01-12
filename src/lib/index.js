import mysql from "mysql";

export const connection = mysql.createConnection({
  host: "sftp.jbugel.xyz",
  user: "jbl",
  password: import.meta.env.VITE_DATABASE_PASSWORD,
  database: "URL_Custom",
});

export const password = import.meta.env.VITE_ADMIN_PASSWORD;
try {
  connection.connect();
} catch (error) {
  console.log(error);
}

/**
 * @param sqlQuery {string}
 * @returns {{ results: [], error: null | string}}
 */
export async function databaseRequest(sqlQuery) {
  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (error, results) => {
      if (error) {
        console.log(error);
        reject({ results: null, error: "Something went wrong!" });
      } else {
        resolve({ results, error: null });
      }
    });
  });
}
