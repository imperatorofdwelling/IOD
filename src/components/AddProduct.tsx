'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { addDoc, collection, getFirestore } from '@firebase/firestore'
import { app } from '@/app/firebase'
import { Product } from '@/app/types'
import { toast } from 'react-toastify'

export default function AddProduct() {
  const [products, setProducts] = useState<Product[]>([])
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const { user } = useAuth()

  const db = getFirestore(app)
  const cardsCollection = collection(db, 'cards')

  const createProduct = async () => {
    try {
      await addDoc(cardsCollection, {
        name: name,
        address: address,
        userId: user?.uid,
      })
      setName('')
      setAddress('')
      toast.success('Карточка добавлена')
    } catch (error) {
      toast.error('Что-то пошло не так')
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Add product</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <input
            type="text"
            placeholder="name"
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <input
            type="text"
            placeholder="address"
            onChange={(e) => {
              setAddress(e.target.value)
            }}
          />
          <button onClick={createProduct}>Добавить дом</button>
        </div>
      </div>
    </div>
  )
}
