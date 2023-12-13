import { useStore } from '@nanostores/react'
import { auth } from '../../../lib/authStore'

export function UserGreeting() {
  const $clerk = useStore(auth)
  const user = $clerk?.user
  return (
    <h1 className="text-3xl font-semibold text-black" suppressHydrationWarning>
      👋 Hi, {user?.firstName || `Stranger`}
    </h1>
  )
}