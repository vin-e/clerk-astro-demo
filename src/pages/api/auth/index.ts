import type { APIRoute } from 'astro'
import { createClerkClient, type Organization, type Session, type User } from '@clerk/clerk-sdk-node'

const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY
const secretKey = import.meta.env.CLERK_SECRET_KEY

const clerk = createClerkClient({ publishableKey, secretKey })
export const GET: APIRoute = async ({request}) => {
  const { toAuth } = await clerk.authenticateRequest({ request, publishableKey, secretKey })
  const auth = toAuth()
  const user = await clerk.users.getUser(auth!.userId!)
  const session = await clerk.sessions.getSession(auth!.sessionId!)
  let org = auth?.orgId ? await clerk.organizations.getOrganization({ organizationId: auth.orgId }) : undefined

  let content = getUserGreeting(user)
  content += `<div class="grid gap-4 mt-8 lg:grid-cols-3">`
  content += getUserDetails(user)
  content += getSessionDetails(session!)
  content += getOrgDetails(org)
  content += `</div>`

  return new Response(content, {
    status: 200
  })
}

const getUserGreeting = (user: User) => {
  return `<h1 class="text-3xl font-semibold text-black">👋 Hi, ${user?.firstName || 'Stranger'}</h1>`
}

const getUserDetails = (user: User) => {
  return `
    <div
      class="bg-white overflow-hidden sm:rounded-lg"
      style='box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08)'
    >
      <div class="flex p-8">
        <h3 class="text-xl leading-6 font-semibold text-gray-900 my-auto">
          User
        </h3>
      </div>
      <div class="pb-6 max-h-96">
        <dl>
          <div class="px-8 py-2">
            <dt class="text-sm font-semibold">User ID</dt>
            <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
              ${user.id}
            </dd>
          </div>
          ${user.firstName ? `
            <div class="px-8 py-2">
              <dt class="text-sm font-semibold mb-1">First Name</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                ${user.firstName}
              </dd>
            </div>
          `: ''}
          ${user.lastName ? `
            <div class="px-8 py-2">
              <dt class="text-sm font-semibold mb-1">Last Name</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                ${user.lastName}
              </dd>
            </div>
          `: ''}
          <div class="px-8 py-2">
            <dt class="text-sm font-semibold mb-1">Email addresses</dt>
            <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
              ${user.emailAddresses.map((email: any) => (`
                <div key={email.id} class="flex gap-2 mb-1">
                  ${email.emailAddress}
                  ${user.primaryEmailAddressId === email.id && `
                    <span class="text-xs bg-primary-50 text-primary-700 rounded-2xl px-2 font-medium pt-[2px]">
                      Primary
                    </span>
                  `}
                </div>
              `))}
            </dd>
          </div>
          ${user.imageUrl ? `
            <div class="px-8 py-2">
              <dt class="text-sm font-semibold mb-1">Profile Image</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                <img
                  src="${user.imageUrl}"
                  class="rounded-full w-12 h-12"
                />
              </dd>
            </div>
          ` : ''}
        </dl>
      </div>
    </div>
  `
}

const getSessionDetails = (session: Session) => {
  return `
  <div
    class="bg-white shadow overflow-hidden sm:rounded-lg"
    style='box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08)'
  >
    <div class="flex p-8">
      <h3 class="text-xl leading-6 font-semibold text-gray-900 my-auto">
        Session
      </h3>
    </div>
    <div class="pb-6 max-h-96">
      <dl>
        <div class="px-8 py-2">
          <dt class="text-sm font-semibold">Session ID</dt>
          <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
            ${session.id}
          </dd>
        </div>
        <div class="px-8 py-2">
          <dt class="text-sm font-semibold mb-1">Status</dt>
          <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
            ${session.status === `active` && `
              <span class="text-xs bg-success-50 text-success-700 flex w-min gap-1 px-2 py-[1px] rounded-2xl font-medium">
                <div class="m-auto">
                  <svg
                    width="7"
                    height="6"
                    viewBox="0 0 7 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="3.3335" cy="3" r="3" fill="#12B76A" />
                  </svg>
                </div>
                Active
              </span>
            `}
          </dd>
        </div>
        <div class="px-8 py-2">
          <dt class="text-sm font-semibold mb-1">Last Active</dt>
          <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
            ${new Date(session.lastActiveAt).toLocaleString()}
          </dd>
        </div>
        <div class="px-8 py-2">
          <dt class="text-sm font-semibold mb-1">Expiry</dt>
          <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
            ${new Date(session.expireAt).toLocaleString()}
          </dd>
        </div>
      </dl>
    </div>
  </div>
  `
}

const getOrgDetails = (org?: Organization) => {
  let content = `
    <div
      class="bg-white shadow overflow-hidden sm:rounded-lg"
      style='box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08)'
    >
      <div class="flex p-8">
        <h3 class="text-xl leading-6 font-semibold text-gray-900 my-auto">
          Organization
        </h3>
      </div>
  `
  if (org) {
    content += `
    <div class="pb-6 max-h-96">
      <dl>
        <div class="px-8 py-2">
          <dt class="text-sm font-semibold">Organization ID</dt>
          <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
            ${org.id}
          </dd>
        </div>
        <div class="px-8 py-2">
          <dt class="text-sm font-semibold mb-1">Name</dt>
          <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
            ${org.name}
          </dd>
        </div>
        <div class="px-8 py-2">
          <dt class="text-sm font-semibold mb-1">Members</dt>
          <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
            ${org.members_count || 0}
          </dd>
        </div>
        <div class="hidden"><-- Pending count is not available on org object in node sdk --></div>
        <div class="px-8 py-2">
          <dt class="text-sm font-semibold mb-1">Image</dt>
          <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
            <img
              class="rounded"
              src="${org.imageUrl}"
              alt="Logo for ${org.name}"
              width="48"
              height="48"
            />
          </dd>
        </div>
      </dl>
    </div>
  `
  } else {
    content += `
      <div class="text-gray-700 px-8 pb-5 text-sm">
        You are currently logged in to your personal workspace.
        <br />
        Create or switch to an organization to see its details.
      </div>
    `
  }

  content += '</div>'
  return content
}