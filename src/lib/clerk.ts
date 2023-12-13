import Clerk from '@clerk/clerk-js'
import { auth } from './authStore'

const clerkPublishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY
let clerk: Clerk

export const initializeClerk = () => {
  const authNano = auth.get()
  if (authNano) return

  clerk = new Clerk(clerkPublishableKey)
  clerk
    .load()
    .then(() => {
      auth.set(clerk)
    })
    .catch(error => console.error(error))
}
