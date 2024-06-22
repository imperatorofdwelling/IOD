'use client'

import { useEffect } from 'react'
import EmptyState from '../../shared/ui/EmptyState'
interface IError {
    error: Error
}

const ErrorState: React.FC<IError> = ({ error }) => {
    useEffect(() => {
        console.error(error)
    }, [error])
    return <EmptyState title="Упс..." subtitle="Что-то пошло не так" />
}

export default ErrorState
