import dynamic from 'next/dynamic'
import { Loader } from '../Loader'

export const YandexMap = dynamic(
    () => import('./YandexMap').then(({ YandexMap }) => YandexMap),
    {
        loading: () => <Loader />,
    }
)
