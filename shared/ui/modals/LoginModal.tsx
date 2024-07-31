'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaYandex } from 'react-icons/fa'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import Button from '../Button'
import useLoginModal from 'shared/hooks/useLoginModal'
import { useRouter } from 'next/navigation'
import useRegisterModal from 'shared/hooks/useRegisterModal'

const LoginModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const toggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false)
      if (callback?.ok) {
        toast.success('Вход выполнен')
        router.refresh()
        loginModal.onClose()
      }
      if (callback?.error) {
        toast.error('Неправильный логин или пароль')
      }
    })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Добро пожаловать в Imperator Of Dwelling"
        subtitle="Вход в аккаунт"
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
          <div>Нет аккаунта?</div>
          <div
            className="text-black cursor-pointer hover:underline transition"
            onClick={toggle}
          >
            Регистрация
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Вход"
      actionLabel="Войти"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
