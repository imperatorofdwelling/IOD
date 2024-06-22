import { useQuery } from '@tanstack/react-query'
import { getListingsUserId } from '../server-actions'
import { QueryKeys } from 'shared/consts/queryKeys'

/**
 * Получение списка квартир созданных пользователем
 */
export const useGetUserListingsById = (userId: string) => {
    return useQuery({
        queryFn: () => getListingsUserId(userId),
        queryKey: QueryKeys.getUserListings,
    })
}
