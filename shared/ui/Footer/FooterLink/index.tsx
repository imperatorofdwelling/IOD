import { type FC } from 'react'
import Link from 'next/link'
import { cn } from '@/shared/utils/cn'
import s from './s.module.scss'

interface IFooterLink {
    className?:string
    href?:string
    children?:string
}


export const FooterLink:FC<IFooterLink> = (props) => {
    const { href, children, className } = props
    return <Link href={href || '#'} className={cn(s.link, className)}>
        <div>{'>'}</div>
        <p className={s.label}>{children}</p>
    </Link>
}
