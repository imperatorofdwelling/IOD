import { useRouter } from 'next/navigation';
import axios from "axios";
import { useMemo, useCallback } from 'react'
import { toast } from 'react-hot-toast';

import { SafeUser } from '@/types';
import useLoginModal from './useLoginModal';

interface IUserFavorite {
    listingId: string
    currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: IUserFavorite) => {
    const router = useRouter()
    const loginModal = useLoginModal()

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || []

        return list.includes(listingId)
    }, [currentUser, listingId])

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        if (!currentUser) {
            return loginModal.onOpen()
        }
        try {
            let request
            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`)
            }

            await request()
            router.refresh()
            toast.success('Добавлено в избранное')
        } catch (error) {
            toast.error('Что-то пошло не так')
        }
    }, [currentUser, hasFavorited, listingId, loginModal, router])

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite