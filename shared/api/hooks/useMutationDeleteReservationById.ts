import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { $axios, AxiosError } from 'shared/axios'

export const useMutationDeleteReservationById = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn(actionId: string) {
            return $axios.delete(`reservations/${actionId}`)
        },
        onSuccess() {
            toast.success('Отменено')
            queryClient.invalidateQueries({ queryKey: ['reservations'] })
        },
        onError(error) {
            toast.success('Ошибка отмены резервации')
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data?.error)
            }
        },
    })
}
