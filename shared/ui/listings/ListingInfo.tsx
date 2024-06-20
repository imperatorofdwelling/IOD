'use client'

import useCities from 'shared/hooks/useCities'
import { SafeUser } from '@/types'
import Avatar from '../Avatar'
import dynamic from 'next/dynamic'

interface IListingInfo {
  user: SafeUser | null
  description: string
  roomCount: number
  bathroomCount: number
  guestCount: number
  locationValue: string
}

// const Map = dynamic(() => import('map'))

const ListingInfo: React.FC<IListingInfo> = ({
  user,
  description,
  roomCount,
  bathroomCount,
  guestCount,
  locationValue,
}) => {
  const { getByValue } = useCities()
  const coordinatesLat = getByValue(locationValue)?.coordsLat
  const coordinatesLon = getByValue(locationValue)?.coordsLon

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
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      Сделать мапу
    </div>
  )
}

export default ListingInfo
