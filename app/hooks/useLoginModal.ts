import { create } from 'zustand'

interface ILoginModal {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useLoginModal = create<ILoginModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useLoginModal