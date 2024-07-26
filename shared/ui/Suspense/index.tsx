'use client'

import { ReactNode } from 'react'
import React from 'react'

export const Suspense = ({ children }: { children: ReactNode }) => {
    return <React.Suspense>{children}</React.Suspense>
}
