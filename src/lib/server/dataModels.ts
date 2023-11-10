import { sql } from "@vercel/postgres";

export async function createTableConfig() {
  await sql`
        CREATE TABLE IF NOT EXISTS config (
            version VARCHAR (16) NOT NULL,
            root_password VARCHAR (256) NOT NULL
        );`;
}

export async function dropTableConfig() {
  await sql`DROP TABLE IF EXISTS config;`;
}

export async function createTableCategories() {
  await sql`
        CREATE TABLE  categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL	
        );`;
}

export async function dropTableCategories() {
  await sql`DROP TABLE IF EXISTS categories CASCADE;`;
}

export async function createTableArticles() {
  await sql`
        CREATE TABLE  articles (
            id SERIAL PRIMARY KEY,
            uuid uuid DEFAULT gen_random_uuid(),
            title VARCHAR (256) NOT NULL,
            content TEXT,
            created_at DATE DEFAULT NOW (),
            author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            image_url VARCHAR
        );`;
}

export async function dropTableArticles() {
  await sql`DROP TABLE IF EXISTS articles CASCADE;`;
}

export async function createTableArticlesCategories() {
  await sql`
        CREATE TABLE  articlesCategories (
            article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
            category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE
        );`;
}

export async function dropTableArticlesCategories() {
  await sql`DROP TABLE IF EXISTS ArticlesCategories CASCADE;`;
}

export async function createTableUsers() {
  await sql`
        CREATE TABLE  users (
            id SERIAL PRIMARY KEY,
            uuid uuid DEFAULT gen_random_uuid(),
            first_Name VARCHAR (256) NOT NULL,
            last_Name VARCHAR (256) NOT NULL,
            pseudo VARCHAR (256) NOT NULL,
            password VARCHAR (256) NOT NULL,
            email VARCHAR (256) UNIQUE NOT NULL
        );`;
}

export async function dropTableUsers() {
  await sql`DROP TABLE IF EXISTS Users CASCADE;`;
}

export async function createTableUserSessions() {
  await sql`
        CREATE TABLE  UserSessions (
            user_Id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            userSession VARCHAR (256) NOT NULL,
            createdAt DATE DEFAULT NOW()
        );`;
}

export async function dropTableUserSessions() {
  await sql`DROP TABLE IF EXISTS UserSessions CASCADE;`;
}

export async function createTableUserArticles() {
  await sql`
    CREATE TABLE  UserArticles (
        user_Id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
        read_status BOOLEAN NOT NULL,
        PRIMARY KEY (user_id, article_id)	
        );`;
}

export async function dropTableUserArticles() {
  await sql`DROP TABLE if exists UserArticles CASCADE;`;
}

export async function createTableComments() {
  await sql`
    CREATE TABLE Comments (
        id SERIAL PRIMARY KEY,
        uuid uuid DEFAULT gen_random_uuid(),
        created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
        created_at DATE DEFAULT NOW(),
        content TEXT
    );`;
}

export async function dropTableComments() {
  await sql`DROP TABLE if exists Comments;`;
}
