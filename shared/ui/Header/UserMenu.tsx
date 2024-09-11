'use client'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import {
    SyntheticEvent,
    useCallback,
    useEffect,
    useState,
    type FC,
} from 'react'
import MenuItem from 'shared/ui/Header/MenuItem'
import useRegisterModal from 'shared/hooks/useRegisterModal'
import useLoginModal from 'shared/hooks/useLoginModal'
import { signOut } from 'next-auth/react'
import { type SafeUser } from '@/types'
import useRentModal from 'shared/hooks/useRentModal'
import { useRouter } from 'next/navigation'

interface IUserMenu {
    currentUser?: SafeUser | null
}

const UserMenu: FC<IUserMenu> = ({ currentUser }) => {
    const router = useRouter()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const rentModal = useRentModal()
    const [isOpen, setIsOpen] = useState(false)

    const openModal = (e: any) => {
        setIsOpen((open) => !open)
    }

    const closeModal = useCallback((e: any) => {
        if (!e.target.closest('.UserMenu')) {
            setIsOpen(false)
            return
        }
    }, [])

    useEffect(() => {
        document.addEventListener('click', closeModal)

        return () => document.removeEventListener('click', closeModal)
    }, [closeModal])

    const onRent = () => {
        if (!currentUser) {
            return loginModal.onOpen()
        }
        rentModal.onOpen()
    }

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                {currentUser ? (
                    <div
                        className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-100 hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition cursor-pointer"
                        onClick={onRent}
                    >
                        Разместить объявление
                    </div>
                ) : (
                    <div
                        className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-100 hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition cursor-pointer"
                        onClick={() => {
                            registerModal.onOpen()
                        }}
                    >
                        Забронировать
                    </div>
                )}
                <div
                    className="hover:bg-neutral-900 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-100 UserMenu p-4 md:py-1 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                    onClick={openModal}
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="HeaderUserModal absolute rounded-xl shadow-md w-[50vw] border-[1px] border-neutral-500 md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer bg-white dark:bg-black p-3">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={() =>
                                        router.push('/user-reservations')
                                    }
                                    label="Забронировано"
                                />
                                <MenuItem
                                    onClick={() => router.push('/user-rentals')}
                                    label="Мои объявления"
                                />
                                <MenuItem
                                    onClick={() => router.push('/favorites')}
                                    label="Моё избранное"
                                />
                                {/* <hr /> */}
                                <MenuItem
                                    onClick={() => {
                                        signOut()
                                    }}
                                    label="Выйти"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={() =>
                                        router.push('/auth/login')
                                    }
                                    label="Войти"
                                />
                                <MenuItem
                                    onClick={() =>
                                        router.push('/auth/register')
                                    }
                                    label="Регистрация"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu
