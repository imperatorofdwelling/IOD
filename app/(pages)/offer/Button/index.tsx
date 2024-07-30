'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/GeneralButton'

export const BackButton = () => {
    const router = useRouter()

    return (
        <Button
            onClick={() => {
                router.push('/')
            }}
        >
            Назад
        </Button>
    )
}
