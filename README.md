# Backoffice - Sejours Normandie Destination

## Database

### Docker - local development database

#### prerequisite

- docker: you can install [docker-desktop](https://www.docker.com/products/docker-desktop/)

#### creating docker image

A postgres image is built with all the sql scripts needed to initialize the database. This is useful for local development.

First thing is to build the image with the following script. It will also generate the file .env.development.local if it doesn't exist. It contain the credential that will be used.

```bash
pnpm run db:create-docker-image
```

You can see the image in docker desktop or with the following command

```bash
docker image ls --filter reference=snd-backoffice-db-dev
```

#### start/stop a local database

After docker image has been built you can now start a new container of this image.

```bash
pnpm run db:start
```

If you have updated the image you will have to stop and start a new container to take the new change into account

```bash
pnpm run db:stop
```

### @vercel/postgres - production database

Executing below script will run all the DDL scripts from src-database

```bash
pnpm run db:create-tables
```

Before reexecuting the DDL scripts we need to drop all related tables first.

```bash
pnpm run db:drop-tables
```

## Testing

### unit

Testing individual components of a program are tested in isolation to ensure they work correctly. The test file is close to the source file with the suffix '.test.ts'.

Using testing library we can test basic behavior of a component to validate the intent.

```bash
pnpm run test:unit
```

### integration

Integration Testing of function or behavior which are purely backend oriented.

```bash
pnpm run test:integration
```

### integration with browser

Integration Testing of function or behavior which are purely frontend oriented.

```bash
pnpm run test:browser
```
