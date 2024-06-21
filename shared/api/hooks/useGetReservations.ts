import { useQuery } from '@tanstack/react-query'
import { getReservations } from '../server-actions'

export const useGetReservations = (userId: string) =>
    useQuery({
        queryKey: ['reservations'],
        queryFn: () => getReservations({ userId }),
    })
