import { initialProfile } from '@/lib/(profile)/initial-profile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

const WelcomeCommunityPage = async () => {
	const profile = await initialProfile()
	const server = await db.server.findFirst({
		where: {
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	})

	if (server) {
		return redirect(`/community/servers/${server.id}`)
	}
	// return <InitialModal />
	return null
}

export default WelcomeCommunityPage
