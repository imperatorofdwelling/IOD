import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SetStateAction } from 'react'
import toast from 'react-hot-toast'
import { $axios, AxiosError } from 'shared/axios'

interface Body {
    totalPrice: number
    startDate?: Date
    endDate?: Date
    listingId?: string
}

interface Args {
    setDateRange: (...args: any) => any
}

export const useMutationCreateReservationById = ({ setDateRange }: Args) => {
    const router = useRouter()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: Body) => $axios.post('reservations', body),
        onSuccess: () => {
            toast.success('Успешно')
            setDateRange()
            queryClient.invalidateQueries({ queryKey: ['reservations'] })
            router.push('/trips')
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data.message)
            }
        },
    })
}
