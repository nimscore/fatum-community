import { db } from '@/lib/db'
import { initialProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation'

const SetupPage = async () => {
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
	return (
		<>
			<div>
				<p>Создайте сервер</p>
			</div>
		</>
	)
}

export default SetupPage
