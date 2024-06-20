'use client'

import qs from 'query-string'
import useSearchModal from 'shared/hooks/useSearchModal'
import Modal from './Modal'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import CitySelect, { CitiesSelectValue } from '../inputs/CitySelect'
import { formatISO } from 'date-fns'
import Heading from '../Heading'
import Calendar from '../inputs/Calendar'
import Counter from '../inputs/Counter'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()
  const searchModal = useSearchModal()

  const [location, setLocation] = useState<CitiesSelectValue>()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })
  // TODO: Сделать мапу
  // const Map = useMemo(
  //   () =>
  //     dynamic(() => import('map'), {
  //       ssr: false,
  //     }),
  //   [location]
  // )
  // TODO: Сделать мапу
  const onBack = useCallback(() => {
    setStep((value) => value - 1)
  }, [])
  const onNext = useCallback(() => {
    setStep((value) => value + 1)
  }, [])

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext()
    }
    let currentQuery = {}
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    )

    setStep(STEPS.LOCATION)
    searchModal.onClose()
    router.push(url)
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params,
  ])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Поиск'
    }
    return 'Далее'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }
    return 'Назад'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="В каком городе?" />
      <CitySelect
        value={location}
        onChange={(value) => setLocation(value as CitiesSelectValue)}
      />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="В какой диапазон?" />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    )
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Напишите больше информации" />
        <Counter
          title="Гости"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Комнаты"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Ванных комант"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Фильтры"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  )
}

export default SearchModal
