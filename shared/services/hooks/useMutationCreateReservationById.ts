import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { $axios, AxiosError } from 'shared/axios'
import { QueryKeys } from 'shared/consts/queryKeys'

interface Body {
    totalPrice: number
    startDate?: Date
    endDate?: Date
    listingId?: string
}

/** Бронирование квартиры */
export const useMutationCreateReservationById = () => {
    const router = useRouter()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: Body) => $axios.post('reservations', body),
        onSuccess: () => {
            toast.success('Успешно')
            queryClient.invalidateQueries({
                queryKey: QueryKeys.getReservations,
            })
            router.push('/user-reservations')
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data.message)
            }
        },
    })
}
