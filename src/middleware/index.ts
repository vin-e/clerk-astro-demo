import { defineMiddleware, sequence } from "astro:middleware";
import clerkClient from '@clerk/clerk-sdk-node'

const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY
const secretKey = import.meta.env.CLERK_SECRET_KEY

const protectedPageUrls = ['/dashboard']
export const protectedPages = defineMiddleware(async ({request, redirect}, next) =>  {
  const url = new URL(request.url)
  if (!protectedPageUrls.some(path => url.pathname.startsWith(path))) {
    return next()
  }
  
  const { isSignedIn } = await clerkClient.authenticateRequest({ request, publishableKey, secretKey })
  if (!isSignedIn) {
    return redirect('/')
  }
  
  // return a Response or the result of calling `next()`
  return next()
})

export const onRequest = sequence(protectedPages)