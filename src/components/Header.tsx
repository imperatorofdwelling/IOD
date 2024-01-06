'use client'
import Link from 'next/link'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Navbar from './Navbar'

export default function Header() {
  return (
    <>
      <Navbar />
      <div className="bg-white -z-50">
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-20 sm:py-48 lg:py-56">
            <div className="text-center space-y-14">
              <h1 className="text-4xl font-bold tracking-tight text-indigo-6  00 sm:text-6xl">
                Imperator Of Dwelling
              </h1>

              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Поиск..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
