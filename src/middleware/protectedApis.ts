import { defineMiddleware } from 'astro:middleware'
import clerkClient from '@clerk/clerk-sdk-node'

const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY
const secretKey = import.meta.env.CLERK_SECRET_KEY

const protectedApiUrls = ['/api/auth']
export const protectedApis = defineMiddleware(async ({request}, next) =>  {
  const url = new URL(request.url)
  if (!protectedApiUrls.some(path => url.pathname.startsWith(path))) {
    return next()
  }
  
  const { isSignedIn } = await clerkClient.authenticateRequest({ request, publishableKey, secretKey })
  if (!isSignedIn) {
    return new Response('<p>Bad Request</p>', { status: 401})
  }

  return next()
})