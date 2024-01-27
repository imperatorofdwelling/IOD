'use client'

import useRegisterModal from '@hooks/useRegisterModal'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'

const RegisterModal = () => {
  const registeModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios
      .post('/api/register', data)
      .then(() => {
        registeModal.onClose()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Добро пожаловать в Imperator Of Dwelling"
        subtitle="Создать аккаунт"
        center
      />
      <Input
        id="email"
        label="Почта"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="ФИО"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Пароль"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registeModal.isOpen}
      title="Регистрация"
      actionLabel="Продолжить"
      onClose={registeModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  )
}

export default RegisterModal
