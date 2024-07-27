'use client'
import { Suspense } from 'react'
import useCities from 'shared/hooks/useCities'
import { SafeUser } from '@/types'
import Avatar from '../Avatar'
import { YandexMap } from '../../../widgets/YandexMap'
import { Loader } from '../Loader'

interface IListingInfo {
    user: SafeUser | null
    description: string
    roomCount: number
    bathroomCount: number
    guestCount: number
    locationValue: string
}

const ListingInfo: React.FC<IListingInfo> = ({
    user,
    description,
    roomCount,
    bathroomCount,
    guestCount,
    locationValue,
}) => {
    const { getByValue } = useCities()
    const coorLat = Number(getByValue(locationValue)?.coordsLat)
    const coorLon = Number(getByValue(locationValue)?.coordsLon)

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <Avatar src={user?.image} />
                    <div>{user?.name}</div>
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-lg text-neutral-500">
                    <div>Комнат: {roomCount}</div>
                    <div>Ванных комнат: {bathroomCount}</div>
                    <div>Максимум гостей: {guestCount}</div>
                </div>
            </div>
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <br />
            {coorLat && coorLon && (
                <YandexMap
                    style={{
                        maxWidth: '500px',
                        width: '100%',
                        height: '350px',
                        borderRadius: '0.75rem',
                        overflow: 'hidden',
                    }}
                    coordinates={[coorLat, coorLon]}
                />
            )}
        </div>
    )
}

export default ListingInfo
