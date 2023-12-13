import { useStore } from '@nanostores/react'
import { auth } from '../../../lib/authStore'

export function SessionDetails() {
  const $clerk = useStore(auth)
  const session = $clerk?.session

  return (
    <div
      className="bg-white shadow overflow-hidden sm:rounded-lg"
      style={{
        boxShadow: `0px 20px 24px -4px rgba(16, 24, 40, 0.08)`,
      }}
    >
      <div className="flex p-8">
        <h3 className="text-xl leading-6 font-semibold text-gray-900 my-auto">
          Session
        </h3>
      </div>
      {$clerk?.isReady() && session ? (
          <div className="pb-6 max-h-96">
            <dl>
              <div className="px-8 py-2">
                <dt className="text-sm font-semibold">Session ID</dt>
                <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
                  {session.id}
                </dd>
              </div>
              <div className="px-8 py-2">
                <dt className="text-sm font-semibold mb-1">Status</dt>
                <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                  {session.status === `active` && (
                    <span className="text-xs bg-success-50 text-success-700 flex w-min gap-1 px-2 py-[1px] rounded-2xl font-medium">
                      <div className="m-auto">
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
                  )}
                </dd>
              </div>
              <div className="px-8 py-2">
                <dt className="text-sm font-semibold mb-1">Last Active</dt>
                <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                  {session.lastActiveAt.toLocaleString()}
                </dd>
              </div>
              <div className="px-8 py-2">
                <dt className="text-sm font-semibold mb-1">Expiry</dt>
                <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                  {session.expireAt.toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
       ) : (
        <div className="text-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          Loading user data...
        </div>
      )}
    </div>
  );
}