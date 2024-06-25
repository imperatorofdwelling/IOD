'use client'

import { Map, Placemark } from '@pbe/react-yandex-maps'
import { type FC, type CSSProperties } from 'react'

interface IYandexMap {
    /**
     * @example
     * <YandexMap coordinates={[coorLat, coorLon]} />
     */
    coordinates: [number, number]
    style?: CSSProperties
    className?: string
}

export const YandexMap: FC<IYandexMap> = ({ coordinates, ...other }) => {
    return (
        <Map
            {...other}
            state={{
                center: coordinates,
                zoom: 17,
            }}
        >
            <Placemark geometry={coordinates} />
        </Map>
    )
}
