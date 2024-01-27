import { create } from 'zustand'

interface IRegisterModal {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useRegisterModal = create<IRegisterModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useRegisterModal