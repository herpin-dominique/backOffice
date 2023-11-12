import { sql } from "@vercel/postgres";

export async function createTableBlogArticles() {
  await sql`
        CREATE TABLE IF NOT EXISTS blogArticles (
            email VARCHAR (128) UNIQUE NOT NULL
        );`;
}

export async function addBlogArticles(first_Name: string) {
  return await sql`
      INSERT INTO subscription (email) 
      VALUES (${first_Name});`;
}
