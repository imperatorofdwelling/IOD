'use client'
import useRentModal from '@/hooks/useRentModal'
import Modal from './Modal'
import { useMemo, useState } from 'react'
import Heading from '../Heading'
import CitySelect from '../CitySelect'
import { useRouter } from 'next/navigation'
import { FieldValues, useForm } from 'react-hook-form'

enum STEPS {
  LOCATION = 0,
  INFO = 1,
  IMAGES = 2,
  DESCRIPTION = 3,
  PRICE = 4,
}

const RentModal = () => {
  const rentModal = useRentModal()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(STEPS.LOCATION)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  })

  const location = watch('location')

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Создать'
    }
    return 'Далее'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }
    return 'Назад'
  }, [step])

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Местоположение" subtitle="Выберите город" />
      <CitySelect
        onChange={(value) => setCustomValue('location', value)}
        value={location}
      />
    </div>
  )

  return (
    <Modal
      title="Разместить объявление"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  )
}

export default RentModal
