'use strict'

import Image from "next/image";
import styles from "./selection.module.css"

interface IDialogItem {
    content?: string,
    date: Date,
    check?: boolean,
    type: string,
    className?: string

}

const DialogItem: React.FC<IDialogItem> = ({ content, date, check, type }) => {
    console.log(date);
    return (
        <div className={`flex justify-center flex-col ${type === 'receive' ? 'items-start' : 'items-end'} `}>
            {type === 'receive' &&
                    <div className={`relative border border-[#222225] p-2 max-w-[50%] rounded-tl-none rounded-lg my-2 ${styles['chatbox-receive']}`}>
                        <div className={`absolute ${styles.triangle} top-0 left-0`}></div>
                        <p className="text-[#757575] flex items-start justify-start pl-2">{content}</p>
                        <p className="text-[#2C2C2C] flex items-start justify-end pr-1">{`${date.getHours()}:${date.getMinutes()}`}</p>                   
                </div>}
            {type === 'send' &&
                <div className={`relative bg-[#222225] rounded-tr-none rounded-lg p-2 my-2 max-w-[85%] break-words z-[-1] ${styles['chatbox-sender']}`}>
                    <p className="text-white flex items-start justify-start">{content}</p>
                    <p className="text-[#2C2C2C] flex items-start justify-end pr-1">{`${date.getHours()}:${date.getMinutes()}`}</p>
                </div>}
            <div>{check ? <Image alt="" src={'/check.png'} width={13.75} height={7.5}/> : ''}</div>
        </div>
    )
}

export default DialogItem