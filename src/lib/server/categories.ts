import { sql } from "@vercel/postgres";
export type Category = {
  uuid: string;
  name: string;
};
export async function getCategories() {
  const { rows } = await sql`SELECT id as uuid,
    name 
    FROM categories 
    `;
  return rows as Category[];
}
export async function createCategory(name: string) {
  const { rows } = (await sql`INSERT INTO categories (name) values (${name})
    returning id`) as unknown as any;
  return rows[0].id as string;
}
export async function deleteCategory(uuid: string) {
  await sql`DELETE FROM categories WHERE id = ${uuid}`;
}
