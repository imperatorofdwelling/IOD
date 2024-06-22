import { useQuery } from '@tanstack/react-query'
import { getReservations } from '../server-actions'
import { QueryKeys } from 'shared/consts/queryKeys'

/** Получение списка забронированных квартир пользователя */
export const useGetReservations = (userId: string) =>
    useQuery({
        queryKey: QueryKeys.getReservations,
        queryFn: () => getReservations({ userId }),
    })
