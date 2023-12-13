import { useStore } from '@nanostores/react'
import { auth } from '../../../lib/authStore'

export function UserDetails() {
  const $clerk = useStore(auth)
  const user = $clerk?.user

  return (
    <div
      className="bg-white overflow-hidden sm:rounded-lg"
      style={{
        boxShadow: `0px 20px 24px -4px rgba(16, 24, 40, 0.08)`,
      }}
    >
      <div className="flex p-8">
        <h3 className="text-xl leading-6 font-semibold text-gray-900 my-auto">
          User
        </h3>
      </div>
      {$clerk?.isReady() && user ? (
          <div className="pb-6 max-h-96">
            <dl>
              <div className="px-8 py-2">
                <dt className="text-sm font-semibold">User ID</dt>
                <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
                  {user.id}
                </dd>
              </div>
              {user.firstName && (
                <div className="px-8 py-2">
                  <dt className="text-sm font-semibold mb-1">First Name</dt>
                  <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                    {user.firstName}
                  </dd>
                </div>
              )}
              {user.lastName && (
                <div className="px-8 py-2">
                  <dt className="text-sm font-semibold mb-1">Last Name</dt>
                  <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                    {user.lastName}
                  </dd>
                </div>
              )}
              <div className="px-8 py-2">
                <dt className="text-sm font-semibold mb-1">Email addresses</dt>
                <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                  {user.emailAddresses.map((email: any) => (
                    <div key={email.id} className="flex gap-2 mb-1">
                      {email.emailAddress}
                      {user.primaryEmailAddressId === email.id && (
                        <span className="text-xs bg-primary-50 text-primary-700 rounded-2xl px-2 font-medium pt-[2px]">
                          Primary
                        </span>
                      )}
                    </div>
                  ))}
                </dd>
              </div>
              {user.imageUrl && (
                <div className="px-8 py-2">
                  <dt className="text-sm font-semibold mb-1">Profile Image</dt>
                  <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                    <img
                      src={user.imageUrl}
                      className="rounded-full w-12 h-12"
                    />
                  </dd>
                </div>
              )}
            </dl>
          </div>
        ) : (
        <div className="text-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          Loading user data...
        </div>
      )}
    </div>
  )
}