import { useState } from 'react'
import { useStore } from '@nanostores/react'
import { auth } from '../../../lib/authStore'

export function OrgDetails() {
  const $clerk = useStore(auth)
  const [organization, setOrganization] = useState($clerk?.organization)

  $clerk?.addListener((clerk) => {
    if (organization?.id !== clerk.organization?.id) {
      setOrganization(clerk.organization)
    }
  })
  
  return (
    <div
      className="bg-white shadow overflow-hidden sm:rounded-lg"
      style={{
        boxShadow: `0px 20px 24px -4px rgba(16, 24, 40, 0.08)`,
      }}
    >
      <div className="flex p-8">
        <h3 className="text-xl leading-6 font-semibold text-gray-900 my-auto">
          Organization
        </h3>
      </div>
      {$clerk?.isReady() ? (
        organization ? (
            <div className="pb-6 max-h-96">
              <dl>
                <div className="px-8 py-2">
                  <dt className="text-sm font-semibold">Organization ID</dt>
                  <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
                    {organization.id}
                  </dd>
                </div>
                <div className="px-8 py-2">
                  <dt className="text-sm font-semibold mb-1">Name</dt>
                  <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                    {organization.name}
                  </dd>
                </div>
                <div className="px-8 py-2">
                  <dt className="text-sm font-semibold mb-1">Members</dt>
                  <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                    {organization.membersCount}
                  </dd>
                </div>
                <div className="px-8 py-2">
                  <dt className="text-sm font-semibold mb-1">
                    Pending invitations
                  </dt>
                  <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                    {organization.pendingInvitationsCount}
                  </dd>
                </div>
                <div className="px-8 py-2">
                  <dt className="text-sm font-semibold mb-1">Image</dt>
                  <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                    <img
                      className="rounded"
                      src={organization.imageUrl}
                      alt={`Logo for ${organization.name}`}
                      width={48}
                      height={48}
                    />
                  </dd>
                </div>
              </dl>
            </div>
          ) : (
          <div className="text-gray-700 px-8 pb-5 text-sm">
            You are currently logged in to your personal workspace.
            <br />
            Create or switch to an organization to see its details.
          </div>
        )) : (
        <div className="text-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          Loading organization data...
        </div>
      )}
    </div>
  );
}