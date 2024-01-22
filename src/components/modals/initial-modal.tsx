'use client'

import { FileUpload } from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
	name: z.string().min(1, {
		message: 'Название сервера - обязательно',
	}),
	imageUrl: z.string().min(1, {
		message: 'Логотип сервера - обязательный',
	}),
})

export const InitialModal = () => {
	const [isMounted, setIsMounted] = useState(false)
	useEffect(() => {
		setIsMounted(true)
	}, [])
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			imageUrl: '',
		},
	})

	const isLoading = form.formState.isSubmitting
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values)
	}

	if (!isMounted) {
		return null
	}

	return (
		<Dialog open>
			<DialogContent className='bg-white text-black p-0 overflow-hidden'>
				<DialogHeader className='pt-8 px-6'>
					<DialogTitle className='text-2xl text-center font-bold'>
						Настройте Ваш сервер
					</DialogTitle>
					<DialogDescription className='text-center text-zinc-500'>
						Разнообразьте свой сервер, добавив ему название и логотип. Вы всегда
						сможете это изменить позднее
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<div className='space-y-8 px-6'>
							<div className='flex items-center justify-center text-center'>
								<FormField
									control={form.control}
									name='imageUrl'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<FileUpload
													endpoint='serverImage'
													value={field.value}
													onChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
											Название сервера
										</FormLabel>
										<FormControl>
											<Input
												disabled={isLoading}
												className='bg-zinc-300/50 border-0 focus-visible:ring-offset-0'
												placeholder='Enter Server Name'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter className='bg-gray-100 px-6 py-4'>
							<Button variant='primary' disabled={isLoading}>
								Create
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}