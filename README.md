***

For an updated and maintained version of the astro and clerk implementaiton please visit [maybrito's repo](https://github.com/maykbrito/astro-clerk-auth)

***

# Clerk and Astro SSR Template

## Introduction

This project is based on [Astro 4.0](https://astro.build) blank template and pulls in [Clerk](https://clerk.com) authentication via their vanilla js client side and backend libraries. This template is a clone of the [Next.js and Clerk](https://github.com/clerk/clerk-nextjs-demo-app-router/) demo project.

The dashboard is currently using react components to render the user, session and organization information. As noted in the [TO DO List](#to-do-list) I plan to add a few additional variations of the dashboard page.

### View it live

On Vercel at: [https://clerk-astro-demo-vin-e.vercel.app/](https://clerk-astro-demo-vin-e.vercel.app/)

## NOTE TO CLERK

Please feel free to take this code and publish/modify on your github channel. 

## Known issue(s)

* At the moment this implementation does not support ViewTransitions (or HTMX boost). The pages are expected to be fully rendered and the javascript code to watch for clerk and clerk.isReady() does not execute.
