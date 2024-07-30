'use client'
import Link from 'next/link'

interface IMenuItem {
    onClick: () => void
    label: string
}

const MenuItem: React.FC<IMenuItem> = ({ onClick, label }) => {
    return (
        <div
            className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-400 transition font-semibold"
            onClick={onClick}
        >
            {label}
        </div>
    )
}

export default MenuItem
