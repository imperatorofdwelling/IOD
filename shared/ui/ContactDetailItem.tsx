'use client'

import Image from "next/image"

interface IContactDetailItem {
    src: string
    content: string,
}


const ContactDetailItem: React.FC<IContactDetailItem> = ({ src, content }) => {
    return (
        <div className='p-6 flex items-center justify-start gap-3'>
            <Image
                src={src}
                alt=''
                width={19}
                height={13}
            />
            <p className="font-medium text-base text-[#006BE6]">{content}</p>

        </div>
    )
}

export default ContactDetailItem