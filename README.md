<h1 align='center'>
  Ryan's Blog
</h1>

<!-- <p align='center'>
  <img src="https://raw.githubusercontent.com/RyanProMax/blog/main/public/favicon.ico" width="100" alt="Ryan's blog" />
</p> -->

## Quick Start Guide

## Development

```bash
yarn

# If use Windows, you need to run:
$env:PWD = $(Get-Location).Path

yarn dev
```

## Deploy

### GitHub Pages

A [`pages.yml`](.github/workflows/pages.yml) workflow is already provided. Simply select "GitHub Actions" in: `Settings > Pages > Build and deployment > Source`.

### Vercel

The easiest way to deploy the template is to deploy on [Vercel](https://vercel.com). Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Netlify

[Netlify](https://www.netlify.com/)’s Next.js runtime configures enables key Next.js functionality on your website without the need for additional configurations. Netlify generates serverless functions that will handle Next.js functionalities such as server-side rendered (SSR) pages, incremental static regeneration (ISR), `next/images`, etc.

See [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/overview/#next-js-runtime) for suggested configuration values and more details.

### Static hosting services (GitHub Pages / S3 / Firebase etc.)

Run:

```sh
EXPORT=1 UNOPTIMIZED=1 yarn build
```

Then, deploy the generated `out` folder or run `npx serve out` it locally.

> [!IMPORTANT]
> If deploying with a URL base path, like <https://example.org/myblog> you need an extra `BASE_PATH` shell-var to the build command:
>
> ```sh
> EXPORT=1 UNOPTIMIZED=1 BASE_PATH=/myblog yarn build
> ```
>
> => In your code, `${process.env.BASE_PATH || ''}/robots.txt` will print `"/myblog/robots.txt"` in the `out` build (or only `/robots.txt` if `yarn dev`, ie: on localhost:3000)

> [!TIP]
> Alternatively to `UNOPTIMIZED=1`, to continue using `next/image`, you can use an alternative image optimization provider such as Imgix, Cloudinary or Akamai. See [image optimization documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#image-optimization) for more details.

Consider removing the following features that cannot be used in a static build:

1. Comment out `headers()` from `next.config.js`.
2. Remove `api` folder and components which call the server-side function such as the Newsletter component. Not technically required and the site will build successfully, but the APIs cannot be used as they are server-side functions.
