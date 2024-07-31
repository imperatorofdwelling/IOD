'use client'

import { FcGoogle } from 'react-icons/fc'
import { FaYandex } from 'react-icons/fa'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import Button from '../Button'
import { signIn } from 'next-auth/react'
import useLoginModal from 'shared/hooks/useLoginModal'
import { useRouter } from 'next/navigation'
import useRegisterModal from 'shared/hooks/useRegisterModal'
import { $axios } from 'shared/axios'

const RegisterModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const router = useRouter()
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

    $axios
      .post('register', data)
      .then(() => {
        registerModal.onClose()
        toast.success('Аккаунт создан')
        router.refresh()
        loginModal.onOpen()
      })
      .catch((error) => {
        toast.error('Что-то пошло не так')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const toggle = useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Добро пожаловать в Imperator Of Dwelling"
        subtitle="Создать аккаунт"
        center
      />
      <Input
        id="email"
        type="email"
        label="Почта"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        type="text"
        label="ФИО"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Пароль"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline={false}
        label="Войти с помощью Yandex"
        icon={FaYandex}
        onClick={() => signIn('yandex')}
      />
      <Button
        outline={false}
        label="Войти с помощью Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex justify-center flex-row items-center gap-2">
          <div>Уже зарегестрированы?</div>
          <div
            className="text-black cursor-pointer hover:underline transition"
            onClick={toggle}
          >
            Войти
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Регистрация"
      actionLabel="Продолжить"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal
