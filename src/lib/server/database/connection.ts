import { POSTGRES_DATABASE, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER } from '$env/static/private'
import postgres from 'postgres'
import { sql as vercelSql } from '@vercel/postgres'

export const postgresSql = postgres({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE
})

type Primitive = string | number | boolean | undefined | null;

export async function sql(template: TemplateStringsArray, ...params: Primitive[]){
    if( POSTGRES_HOST.match(/localhost/)){
        // casted to any[] mainly for dev only so it should be ok
        return postgresSql(template, ...(params as any[]))
    }
    return (await vercelSql(template, ...params)).rows
}