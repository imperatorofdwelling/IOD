import { useQuery } from '@tanstack/react-query'
import { getDetailApartmentById } from '../server-actions'
import { QueryKeys } from 'shared/consts/queryKeys'

/**
 * Получение деталей квартиры по id
 */
export const useGetDetailApartmentById = (apartmentId?: string) => {
    return useQuery({
        queryFn: () => getDetailApartmentById(apartmentId),
        queryKey: QueryKeys.getDetailApartmentById,
        enabled: !!apartmentId,
    })
}
