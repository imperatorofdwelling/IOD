'use client'
import Link from 'next/link'

interface IMenuItem {
    onClick?: () => void | null
    label: string
    href?: string | null
}

const MenuItem: React.FC<IMenuItem> = ({ onClick, label, href }) => {
    return (
        <div
            className="px-4 text-center py-3 hover:rounded-md rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition font-semibold transition duration-300 ease-in-out transform hover:scale-100"
            onClick={onClick}
        >
            {href? <Link href={href}>{label}</Link> : `${label}`}
        </div>
    )
}

export default MenuItem
