'use client'
import useCities from 'shared/hooks/useCities'
import useSearchModal from 'shared/hooks/useSearchModal'
import { differenceInDays } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'

const Search = () => {
  const searchModal = useSearchModal()
  const params = useSearchParams()
  const { getByValue } = useCities()

  const locationValue = params?.get('locationValue')
  const startDate = params?.get('startDate')
  const endDate = params?.get('endDate')
  const guestCount = params?.get('guestCount')

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.value
    }
    return 'Где-угодно'
  }, [getByValue, locationValue])

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string)
      const end = new Date(endDate as string)
      let diff = differenceInDays(end, start)
      if (diff === 0) {
        diff = 1
      }
      return `${diff} дней`
    }
    return 'Каждый день'
  }, [startDate, endDate])

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `Гостей: ${guestCount}`
    }
    return 'Все гости'
  }, [guestCount])
  return (
    <div
      onClick={searchModal.onOpen}
      className="hover:bg-neutral-900 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-100 border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block text-white">{guestLabel}</div>
          <div className="p-2 bg-black text-white dark:bg-white dark:text-black rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
