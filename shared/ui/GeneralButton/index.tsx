import s from './s.module.scss'
import { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

interface IProps {
    className?: string
    variant?: 'variant-1' | 'variant-2'
    children?: ReactNode
    onClick?: () => void
}

export const Button = (props: IProps) => {
    const { className, children, variant = 'variant-1', onClick } = props

    return (
        <button
            onClick={onClick}
            className={cn(s.btn, {
                [s.var1]: variant === 'variant-1',
                [s.var2]: variant === 'variant-2',
            }, className)}
        >
            {children}
        </button>
    )
}
