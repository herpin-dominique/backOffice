// api/saveArticle.ts
import { sql } from "@vercel/postgres";

export async function post(request: {
  body: {
    author: string;
    date: string;
    articleContent: string;
    categories: string;
    title: string;
    imageUrl: string;
    videoUrl: string;
  };
}) {
  const {
    author,
    date,
    articleContent,
    categories,
    title,
    imageUrl,
    videoUrl,
  } = request.body;

  try {
    await sql`
      INSERT INTO articles (author, date, article_content, categories, title, image_url, video_url)
      VALUES (${author}, ${date}, ${articleContent}, ${categories}, ${title}, ${imageUrl}, ${videoUrl});
    `;

    return {
      status: 200,
      body: { success: true, message: "Article enregistré avec succès" },
    };
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'article:", error);

    return {
      status: 500,
      body: {
        success: false,
        message: "Erreur lors de l'enregistrement de l'article",
      },
    };
  }
}
