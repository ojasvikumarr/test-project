This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
# Project Title

Brief description of the project.
This is a test-project which contains a signup page , login pag and the dashboard 

first the user fills his/her details on the signup page 
after all the validations (like encrypting the password , checking valid phone no. , email and secure password)
(s)he is directed to the login page 

after validating the legitimacy of the user in database , jwt token is generated which gets stored in localstorage 
(s)he is directed to the dashboard where all the details are displayed 
and a logout button provided which shoots the user to the login page 

SECURITY Utilities ;
JsonWebToken ,
Crypto-JS (for password encryption)

UI/UX utilites used : 
Acertinity UI , 
Shadcn Ui , 
Tailwind CSS ,
Framer Motion ,
clsx

## Configuration

Before running the application, ensure you have set up the following environment variables:

- `NEXT_PUBLIC_HOST`=http://localhost:3000/
- `JWT_SECRET`=secret123
- `AES_SECRET`=secret1234

-`POSTGRES_URL`="postgres://default:si5PocqRKF9Q@ep-proud-mountain-a48wobp5-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
-`POSTGRES_PRISMA_URL`="postgres://default:si5PocqRKF9Q@ep-proud-mountain-a48wobp5-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15"
-`POSTGRES_URL_NO_SSL`="postgres://default:si5PocqRKF9Q@ep-proud-mountain-a48wobp5-pooler.us-east-1.aws.neon.tech:5432/verceldb"
-`POSTGRES_URL_NON_POOLING`="postgres://default:si5PocqRKF9Q@ep-proud-mountain-a48wobp5.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
-`POSTGRES_USER`="default"
-`POSTGRES_HOST`="ep-proud-mountain-a48wobp5-pooler.us-east-1.aws.neon.tech"
-`POSTGRES_PASSWORD`="si5PocqRKF9Q"
-`POSTGRES_DATABASE`="verceldb"

## Deployed on Vercel



