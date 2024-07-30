import dynamic from 'next/dynamic'
import { Loader } from '../../shared/ui/Loader'

export const YandexMap = dynamic(
    () => import('./YandexMap').then(({ YandexMap }) => YandexMap),
    {
        loading: () => <Loader />,
    }
)
