# Cinema Booking (Course Project)

## How to run

### Using docker

Make sure Docker is runnung and just run this command
```bash
docker-compose up -d --build
```

After that you can open in browser [localhost:3000](http://localhost:3000), to see if it works

### From host

You need to have installed PostgreSQL server

Install all packages
```bash
npm i
```

Create .env file and add these variables and fill <> with your parameters
```
DATABASE_URL="postgresql://<postgres_name>:<postgres_password>@<postgres_host>:<postgres_port>/cinema?schema=public"
FRONTEND_URL=<running_frontend_URL>
PORT=<port_for_app> # If not specified default will be 3000
```

Apply migrations
```bash
npx prisma migrate deploy
```

After that you can run app in development mode (updating on file change)
```bash
npm run start:dev
```

or in production mode
```bash
npm run start:prod
```