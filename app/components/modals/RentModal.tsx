'use client'
import useRentModal from '@/hooks/useRentModal'
import Modal from './Modal'

const RentModal = () => {
  const rentModal = useRentModal()
  return (
    <Modal
      title="Разместить объявление"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel="Продолжить"
    />
  )
}

export default RentModal
