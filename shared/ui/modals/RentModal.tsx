'use client'
import useRentModal from 'shared/hooks/useRentModal'
import Modal from './Modal'
import { useMemo, useState } from 'react'
import Heading from '../Heading'
import CitySelect from '../inputs/CitySelect'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Counter from '../inputs/Counter'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import { $axios } from 'shared/axios'

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
            category: '',
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
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')

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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext()
        }
        setIsLoading(true)

        $axios
            .post('listings', data)
            .then(() => {
                toast.success('Успешно')
                router.refresh()
                reset()
                setStep(STEPS.LOCATION)
                rentModal.onClose()
            })
            .catch(() => {
                toast.error('Что-то пошло не так')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Создать'
        }

        // console.log(step)
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
            <Heading title="Укажите город" />
            <CitySelect
                value={location}
                onChange={(value) => setCustomValue('location', value)}
            />
        </div>
    )

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Поделитесь основными сведениями"
                    subtitle="Какими удобствами вы располагаете?"
                />
                <Counter
                    title="Гости"
                    subtitle="Максимальное количество гостей"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title="Комнаты"
                    subtitle="Сколько у Вас комнат?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Ванные комнаты"
                    subtitle="Сколько у Вас ванных комнат?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Добавьте фотографии" />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }
    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Описание" subtitle="Дописать текст" />
                <Input
                    id="title"
                    label="Укажите адрес"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Описание"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Цена" />
                <Input
                    id="price"
                    label="Цена"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
            disabled={isLoading}
            title="Разместить объявление"
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default RentModal
