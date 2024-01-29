import { ServerSidebar } from '@/components/(community)/server/server-sidebar'
import { currentProfile } from '@/lib/(profile)/current-profile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const ServerIdLayout = async ({
	children,
	params,
}: {
	children: React.ReactNode
	params: { serverId: string }
}) => {
	const profile = await currentProfile()

	if (!profile) {
		return redirectToSignIn
	}

	const server = await db.server.findUnique({
		where: {
			id: params.serverId,
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	})

	if (!server) {
		return redirect('/community')
	}

	return (
		<>
			<div className='h-full'>
				<div className='hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0'>
					<ServerSidebar serverId={params.serverId} />
				</div>
				<main className='h-full md:pl-60'>{children}</main>
			</div>
		</>
	)
}
export default ServerIdLayout
