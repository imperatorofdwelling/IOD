import { useQuery } from '@tanstack/react-query'
import { getReservations } from '../server-actions'
import { QueryKeys } from 'shared/consts/queryKeys'

export const useGetReservations = (userId: string) =>
    useQuery({
        queryKey: QueryKeys.getReservations,
        queryFn: () => getReservations({ userId }),
    })
