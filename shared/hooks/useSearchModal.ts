import { create } from 'zustand'

interface ISearchModal {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useSearchModal = create<ISearchModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useSearchModal