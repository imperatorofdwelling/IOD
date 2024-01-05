'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { collection, getDocs, getFirestore } from '@firebase/firestore'
import { app } from '@/app/firebase'
import { Product } from '@/app/types'

export default function Card() {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(app)
        const cardsCollection = collection(db, 'cards')
        const snapshot = await getDocs(cardsCollection)
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[]
        setProducts(productsData)
      } catch (error) {
        console.error('Error fetching data from firestore', error)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link key={product.id} href="/" passHref>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.address}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
