// import { redirect } from 'next/navigation'

// import { currentProfile } from '@/lib/current-profile'
// import { db } from '@/lib/db'

// interface InviteCodePageProps {
// 	params: {
// 		inviteCode: string
// 	}
// }

// const InviteCodePage = async ({ params }: InviteCodePageProps) => {
// 	const profile = await currentProfile()

// 	if (!profile) {
// 		return redirectToSignIn()--------------------
// 		return redirect('/sign-in')
// 	}

// 	if (!params.inviteCode) {
// 		return redirect('/')
// 	}

// 	const existingServer = await db.server.findFirst({
// 		where: {
// 			inviteCode: params.inviteCode,
// 			members: {
// 				some: {
// 					profileId: profile.id
// 				}
// 			}
// 		}
// 	})

// 	if (existingServer) {
// 		return redirect(`/community/servers/${existingServer.id}`)
// 	}

// 	const server = await db.server.update({
// 		where: {
// 			inviteCode: params.inviteCode
// 		},
// 		data: {
// 			members: {
// 				create: [
// 					{
// 						profileId: profile.id
// 					}
// 				]
// 			}
// 		}
// 	})

// 	if (server) {
// 		return redirect(`/community/servers/${server.id}`)
// 	}

// 	return null
// }

// export default InviteCodePage

import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'

interface InviteCodePageProps {
	params: {
		inviteCode: string
	}
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
	const profile = await currentProfile()

	if (!profile) {
		return redirectToSignIn()
		//TODO косяк с требование абсолютной ссылки формата redirect('/sign-in'), но пока пусть так
	}

	if (!params.inviteCode) {
		return redirect('/')
	}

	const existingServer = await db.server.findFirst({
		where: {
			inviteCode: params.inviteCode,
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	})

	if (existingServer) {
		return redirect(`/community/servers/${existingServer.id}`)
	}

	const server = await db.server.update({
		where: {
			inviteCode: params.inviteCode,
		},
		data: {
			members: {
				create: [
					{
						profileId: profile.id,
					},
				],
			},
		},
	})

	if (server) {
		return redirect(`/community/servers/${server.id}`)
	}

	return null
}

export default InviteCodePage
