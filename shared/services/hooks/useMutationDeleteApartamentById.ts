import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { $axios } from 'shared/axios'
import { QueryKeys } from 'shared/consts/queryKeys'

export const useMutationDeleteApartamentById = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => $axios.delete(`listings/${id}`),
        onSuccess: () => {
            toast.success('Успешно удалено')
            queryClient.invalidateQueries({
                queryKey: QueryKeys.getUserListings,
            })
        },
        onError: () => toast.error('Не удалось удалить объявление'),
    })
}
