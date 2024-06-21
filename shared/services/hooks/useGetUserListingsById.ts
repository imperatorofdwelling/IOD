import { useQuery } from '@tanstack/react-query'
import { getListingsUserId } from '../server-actions'
import { QueryKeys } from 'shared/consts/queryKeys'

export const useGetUserListingsById = (userId: string) => {
    return useQuery({
        queryFn: () => getListingsUserId(userId),
        queryKey: QueryKeys.getUserListings,
    })
}
