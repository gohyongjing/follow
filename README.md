This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Instructions for LLMs

1. Read this file before starting
1. Document all important information, decisions and instructions for further devs and LLMs in this file.
1. If any file seems inconsistent with what is written here, fix the file or update this file to reflect the updates
1. Be concise and abstract out common code, or instructions as needed. Remove unused code, config and instructions.

1. Do not add comments in the code unless necessary

## Project Initial Setup

This section consists of the steps needed to set up for reproducibility and ease of set up of future code repositories

1. Install nextjs

```
npx create-next-app@latest
```

1. Install linter and formatter

```
npm install --save-dev prettier
npm install --save-dev prettier-plugin-tailwindcss
npm install --save-dev eslint-config-prettier
npm install --save-dev lint-staged
npm install --save-dev husky
npx husky init
```

Install ShadCN UI

```
npx shadcn@latest init
```
