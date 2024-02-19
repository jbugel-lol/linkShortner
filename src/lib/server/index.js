import mysql from "mysql";

export const connection = mysql.createConnection({
  host: "sftp.jbugel.xyz",
  user: "jbl",
  password: import.meta.env.VITE_DATABASE_PASSWORD,
  database: "URL_Custom",
});

startConnection();

/**
 * @param sqlQuery {string}
 * @returns Promise<{{ results: [], error: null | string}}>
 */
export async function databaseRequest(sqlQuery) {
  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (error, results) => {
      if (error) {
        if (connection.state === "disconnected") {
          startConnection();
        }
        console.log(error);
        reject({ results: null, error: "Something went wrong!" });
      } else {
        resolve({ results, error: null });
      }
    });
  });
}

async function startConnection() {
  try {
    connection.connect();

    // databaseRequest("CREATE TABLE urls (id VARCHAR(32) PRIMARY KEY,url TEXT,created BIGINT);");
    // databaseRequest("CREATE TABLE clicks (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, country VARCHAR(3), timestamp BIGINT, link VARCHAR(32), FOREIGN KEY (link) REFERENCES urls(id) ON DELETE CASCADE);")
  } catch (error) {
    console.log(error);
  }
}

/**
 * @param {string} password
 */
export async function issueSessionToken(password) {
  if (password !== import.meta.env.VITE_ADMIN_PASSWORD) {
    return {
      success: false,
      message: "Admin Password is incorrect!"
    }
  }
  const id = generateRandomId(32)

  const result = await databaseRequest(`INSERT INTO sessions(id, expiresAT) VALUES ("${id}", ${(Date.now() + (1000 * 60 * 60 * 24 * 31))})`);

  if (result.error) {
    return { success: false, message: "Something went wrong!" }
  }

  return {
    success: true,
    session: id
  }
}

/**
 * @param {string} sessionToken
 */
export async function validateSessionToken(sessionToken) {
  const result = await databaseRequest(`SELECT * FROM sessions WHERE id = ${connection.escape(sessionToken)}`);
  if (!result.results[0]) return false;
  if (result.results[0].expiresAT > Date.now()) {
    return true;
  } else {
    databaseRequest("DELETE FROM sessions WHERE id = " + connection.escape(sessionToken));
    return false;
  };
}

/**
 * @param {number} length
 */
export function generateRandomId(length) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomId = "";

  length = length ?? 8;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}