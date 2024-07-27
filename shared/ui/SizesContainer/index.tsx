import s from './s.module.scss'
import { cn } from '@/shared/utils/cn'

interface IContainer {
    children: JSX.Element[]
    size?: 'large'
    className?: string
}

export const Container = ({ children, size = 'large', className }: IContainer) => {
    return <div className={cn(s.container, {
        [s.large]: size === 'large'
    }, className)}>
        {children}
        </div>
}


