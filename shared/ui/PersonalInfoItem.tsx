'use client'

interface IPersonalInfoItem {
    title: string
    content: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}


const PersonalInfoItem: React.FC<IPersonalInfoItem> = ({ title, content, onClick }) => {
    return (
        <div className='p-6'>
            <p className='font-medium text-base'>{title}</p>
            <div className='flex items-center justify-between text-sm font-normal'>
                <p className='text-[#757575]'>{content}</p>
                <button className='text-[#006BE6]' onClick={onClick}>Edit</button>
            </div>
        </div>
    )
}

export default PersonalInfoItem