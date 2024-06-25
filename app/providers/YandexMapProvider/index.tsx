'use client'

import { YMaps } from '@pbe/react-yandex-maps'
import type { ReactNode, FC } from 'react'

interface Props {
    children: ReactNode
}

export const YandexMapProvider: FC<Props> = ({ children }) => {
    return (
        <YMaps
            query={{
                lang: 'en_RU',
                apikey: process.env.NEXT_PUBLIC_YANDEX_MAP_API_KEY!,
            }}
        >
            {children}
        </YMaps>
    )
}
