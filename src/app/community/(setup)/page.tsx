import { InitialModal } from '@/components/(community)/modals/initial-modal'
import { db } from '@/lib/db'
import { initialProfile } from '@/lib/(profile)/initial-profile'
import { redirect } from 'next/navigation'

const WelcomeCommunityPage = async () => {
	const profile = await initialProfile()
	const server = await db.server.findFirst({
		where: {
			members: {
				some: {
					profileId: profile.id
				}
			}
		}
	})

	if (server) {
		return redirect(`/community/servers/${server.id}`)
	}
	return <InitialModal />
}

export default WelcomeCommunityPage
