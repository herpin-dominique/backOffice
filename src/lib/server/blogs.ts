import { z } from "zod";
import { sql } from "@vercel/postgres";

// Model défini une structure pour la création d'une donnée
// Schema vérifie la conformité d'une donnée par rapport à une structure

export const BlogSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  date: z.string(),
  content: z.string().min(1),
  // media: z.object({
  //   type: z.union([z.literal("image"), z.literal("video")]),
  //   url: z.string().url(),
  // }),
});

export type Blog = z.infer<typeof BlogSchema>;

export async function saveBlog(data: Blog) {
  console.log(`save to db: ${data}}]`);

  //return await sql`Insert into Blog (title, author, ...) values (${data.title}, ${data.author}, ...) return ID;`;

  return await sql`
  INSERT INTO bo_blogs (title, author, date, content)
  VALUES (${data.title}, ${data.author}, ${data.date}, ${data.content})
  RETURNING id;`;
}

export async function createTableBlogs() {
  await sql`
    CREATE TABLE IF NOT EXISTS bo_blogs (
      
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      content TEXT NOT NULL,
      media JSONB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}
export async function dropTableBlogs() {
  await sql`DROP TABLE IF EXISTS bo_blogs CASCADE;`;
}
