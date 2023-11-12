import { z } from "zod";
import { sql } from "@vercel/postgres";

// Model défini une structure pour la création d'une donnée
// Schema vérifie la conformité d'une donnée par rapport à une structure

export const BlogSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  date: z.string(),
  content: z.string().min(1),
  media: z.object({
    type: z.union([z.literal("image"), z.literal("video")]),
    url: z.string().url(),
  }),
});

export type Blog = z.infer<typeof BlogSchema>;

export async function saveBlog(data: Blog) {
  console.log(`save to db: ${data}}]`);

  //return await sql`Insert into Blog (title, author, ...) values (${data.title}, ${data.author}, ...) return ID;`;
}
