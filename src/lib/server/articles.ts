import { sql, createClient } from "@vercel/postgres";

export interface Article {
  uuid: string;
  title: string;
  date: Date;
  content: string;
  author_id?: string;
  author?: string;
  categories?: string;
  imageUrl?: string;
  videoUrl: string;

  // L'interface "Article" est définie pour représenter la structure d'un article.
  // Elle comprend plusieurs propriétés telles que "uuid" (identifiant unique), "title" (titre), "date" (date), "content" (contenu),
  // "authors" (auteurs), "categories" (catégories) et "imageUrl" (URL de l'image).
}
// Cette fonction permet de créer un nouvel article dans la base de données.
export async function createArticle(
  data: Omit<Article, "uuid" | "date" | "categories">
) {
  // La fonction est déclarée comme une fonction asynchrone pour permettre l'utilisation d'opérations asynchrones.
  const { rows } = await sql`
    INSERT INTO articles (title, content, image_url, author_id) VALUES
        (${data.title}, ${data.content}, ${data.imageUrl}, ${data.author_id})
        returning id;`;
  // Cette partie exécute une requête SQL pour insérer les données de l'article dans la table "articles".
  // Les champs insérés sont le titre, le contenu et l'URL de l'image et l'auteur.
  // La fonction sql permet d'exécuter la requête en utilisant la syntaxe du modèle de requête SQL.
  return rows[0].id as string;
  // La fonction renvoie l'ID de l'article nouvellement créé en tant que chaîne de caractères.
}
export async function createArticlesCategories(
  articleUuid: string,
  categoryUuids: string[]
) {
  for (const categoryUuid of categoryUuids) {
    const { rows } = await sql`
    INSERT INTO articlesCategories (article_id, category_id) VALUES
    (${articleUuid},${categoryUuid})
		`;
  }
}

export interface ArticleFilter {
  userId?: string;
  isRead?: boolean;
  categoryName?: string;
  searchContent?: string;
  page: number;
  size: number;
}

const client = createClient();
await client.connect();

export async function getArticles(filter: ArticleFilter) {
  const parameters: any[] = [filter.size, (filter.page - 1) * filter.size];
  let baseRequest = `
    SELECT 
        a.id as uuid,
        a.title,
        a.created_at as date,
        a.content,
        string_agg( distinct c.name, ', ') as categories,
        a.image_url as "imageUrl",
        u.pseudo as "author"
    FROM articles a
        LEFT OUTER JOIN articlesCategories ac ON a.id = ac.article_id
        LEFT OUTER JOIN categories c ON c.id = ac.category_id 
        LEFT OUTER JOIN users u ON u.id = a.author_id
        LEFT OUTER JOIN userArticles ua on ua.article_id = a.id
    WHERE 1=1`;

  // filtre par categorie
  if (filter.categoryName !== undefined) {
    parameters.push(filter.categoryName);
    baseRequest += ` AND c.name = $${parameters.length}`;
  }

  // filtre par contenu
  if (filter.searchContent !== undefined) {
    parameters.push(filter.searchContent);
    baseRequest += ` AND lower( a.title || a.content ) like lower( '%' ||  $${parameters.length} || '%')`;
  }

  // filter par status
  if (filter.isRead !== undefined && filter.userId !== undefined) {
    parameters.push(filter.userId);
    if (filter.isRead) {
      baseRequest += ` AND ua.user_id = $${parameters.length} AND read_status = true`;
    } else {
      baseRequest += ` AND (
                ( ua.user_id is null and ua.article_id is null ) OR
                ( ua.user_id = $${parameters.length} AND read_status = false )
            )`;
    }
  }
  // pagination et group by
  baseRequest += `
    GROUP BY a.id, u.pseudo
    LIMIT $1 OFFSET $2;`;

  const { rows } = await client.query(baseRequest, parameters);
  return rows as Article[];
}
export async function getArticle(uuid: string) {
  // Récupère un article spécifique en utilisant son identifiant unique (UUID)
  const r = await sql`
        SELECT 
            a.id as uuid,
            a.title,
            a.created_at as date,
            a.content,
            string_agg(c.name, ', ') as categories,
            a.image_url as "imageUrl",
            u.pseudo as "author"
        FROM articles a
            LEFT OUTER JOIN articlesCategories ac ON a.id = ac.article_id
            LEFT OUTER JOIN categories c ON c.id = ac.category_id 
            LEFT OUTER JOIN users u ON u.id = a.author_id
        WHERE a.id = ${uuid}        
        GROUP BY a.id, u.pseudo;
        `;
  return r.rows[0] as Article;
}

export async function countArticles(filter: ArticleFilter) {
  const parameters: any[] = [];
  let baseRequest = `
	SELECT count(*) from (
		SELECT 
			a.id as uuid,
			a.title,
			a.created_at as date,
			a.content,
			string_agg( distinct c.name, ', ') as categories,
			a.image_url as "imageUrl",
			u.pseudo as "author"
		FROM articles a
			LEFT OUTER JOIN articlesCategories ac ON a.id = ac.article_id
			LEFT OUTER JOIN categories c ON c.id = ac.category_id 
			LEFT OUTER JOIN users u ON u.id = a.author_id
			LEFT OUTER JOIN userArticles ua on ua.article_id = a.id
		WHERE 1=1`;

  // filtre par categorie
  if (filter.categoryName !== undefined) {
    parameters.push(filter.categoryName);
    baseRequest += ` AND c.name = $${parameters.length}`;
  }

  // filtre par contenu
  if (filter.searchContent !== undefined) {
    parameters.push(filter.searchContent);
    baseRequest += ` AND lower( a.title || a.content ) like lower( '%' ||  $${parameters.length} || '%')`;
  }

  // filter par status
  if (filter.isRead !== undefined && filter.userId !== undefined) {
    parameters.push(filter.userId);
    if (filter.isRead) {
      baseRequest += ` AND ua.user_id = $${parameters.length} AND read_status = true`;
    } else {
      baseRequest += ` AND (
					( ua.user_id is null and ua.article_id is null ) OR
					( ua.user_id = $${parameters.length} AND read_status = false )
				)`;
    }
  }
  // pagination et group by
  baseRequest += `
		GROUP BY a.id, u.pseudo
	) r;`;

  const { rows } = await client.query(baseRequest, parameters);
  console.log({
    filter,
    rows,
  });
  return Number.parseInt(rows[0].count);
}

//Cette requête récupère les informations d'un article spécifique en utilisant son identifiant unique (a.id = ${uuid}).

//La clause SELECT spécifie les colonnes à sélectionner dans le résultat de la requête. Dans ce cas, nous sélectionnons plusieurs colonnes renommées à l'aide de l'alias (as) pour correspondre aux propriétés de l'objet Article.

//La clause FROM spécifie les tables à partir desquelles nous sélectionnons les données. Nous utilisons la table articles et effectuons une jointure externe gauche (LEFT OUTER JOIN) avec les tables articlesCategories, categories et users.

//La clause ON spécifie les conditions de jointure entre les tables. Nous joignons articles avec articlesCategories sur la colonne a.id = ac.article_id, puis articlesCategories avec categories sur la colonne c.id = ac.category_id, et enfin articles avec users sur la colonne u.id = a.author_id.

//La clause WHERE spécifie les conditions pour filtrer les résultats. Dans ce cas, nous filtrons les articles en utilisant leur identifiant unique (a.id = ${uuid}).

//La clause GROUP BY regroupe les résultats en fonction des colonnes spécifiées. Nous regroupons les résultats par a.id (identifiant de l'article) et a.author_id (identifiant de l'auteur).

//La fonction string_agg(c.name, ', ') est utilisée pour concaténer les noms de catégories en une seule chaîne de caractères, séparée par des virgules.

//Ainsi, cette requête effectue une jointure entre les tables articles, articlesCategories, categories et users pour récupérer les informations d'un article spécifique, y compris les détails du titre, de la date, du contenu, des catégories, de l'URL de l'image et de l'auteur.
