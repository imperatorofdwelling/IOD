'use client'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import { useCallback, useState } from 'react'
import MenuItem from '@components/navbar/MenuItem'
import useRegisterModal from '@hooks/useRegisterModal'
import useLoginModal from '@/hooks/useLoginModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/types'
import useRentModal from '@/hooks/useRentModal'
import { useRouter } from 'next/navigation'

interface IUserMenu {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<IUserMenu> = ({ currentUser }) => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => {
    setIsOpen((value) => !value)
  }

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }
    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {currentUser ? (
          <div
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            onClick={onRent}
          >
            Разместить объявление
          </div>
        ) : (
          <div
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            onClick={() => {
              registerModal.onOpen()
            }}
          >
            Забронировать
          </div>
        )}
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push('/trips')}
                  label="Забронировано"
                />
                <MenuItem onClick={() => {}} label="Мои объявления" />
                <MenuItem
                  onClick={() => router.push('/favorites')}
                  label="Моё избранное"
                />
                <hr />
                <MenuItem
                  onClick={() => {
                    signOut()
                  }}
                  label="Выйти"
                />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Войти" />
                <MenuItem onClick={registerModal.onOpen} label="Регистрация" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
