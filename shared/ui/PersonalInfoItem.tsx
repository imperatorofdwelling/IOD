'use client'

import { SetStateAction, useState } from "react"

interface IPersonalInfoItem {
    title: string
    content: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}


const PersonalInfoItem: React.FC<IPersonalInfoItem> = ({ title, content, onClick }) => {
    const [editable, setEditable] = useState(false)
    const [data, setData] = useState('')
    const handleEdit = () => {
        setEditable(!editable)
    }
    const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
        setData(e.target.value); 
    };
    return (
        <div className='p-6'>
            <p className='font-medium text-base'>{title}</p>
            <div className='flex items-center justify-between text-sm font-normal'>
                <input className={`text-[#757575] bg-inherit ${editable?'border border-[#222225] border-solid':''}`} placeholder={content} disabled={!editable} onChange={editable ? handleInputChange : undefined} />
                <button className='text-[#006BE6] mr-6' onClick={handleEdit}>{editable ? 'Save' : 'Edit'}</button>
            </div>
        </div>
    )
}

export default PersonalInfoItem