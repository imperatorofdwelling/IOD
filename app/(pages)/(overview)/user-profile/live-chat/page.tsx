'use client'
import { SetStateAction, useState, useEffect, useRef, type FC, KeyboardEvent } from 'react'
import { SafeUser } from '@/types'
import {
    useGetUserListingsById,
    useMutationDeleteApartamentById,
} from 'shared/services/hooks'

import GoToBack from '@/shared/ui/GoToBack';
import DialogItem from '@/shared/ui/DialogItem';

interface IPropertiesClient {
    currentUser?: SafeUser | null
}
interface Message {
    content: string;
    date: Date;
    type: 'send' | 'receive';
    check?: boolean;
}

export const LiveChatPage: FC<IPropertiesClient> = ({ currentUser }) => {
    const { data: listings, isLoading } = useGetUserListingsById(
        currentUser?.id || ''
    )
    const [inputData, setInputData] = useState('')
    const [chatMessages, setChatMessages] = useState<Message[]>([
        { content: 'How we can help you?', date: new Date(), type: 'receive' },
        { content: 'Lorem ipsum dolor sit amet consectetur Ac integer bibendum?', date: new Date(), type: 'send', check: true }
    ]);

    const chatEndRef = useRef<HTMLDivElement | null>(null);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
        setInputData(e.target.value);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputData.trim()) {
            // Add the new message to the chat
            setChatMessages((prevMessages) => [
                ...prevMessages,
                { content: inputData, date: new Date(), type: 'send', check: true }
            ]);

            // Clear the input field
            setInputData('');
        }
    };

    // Scroll to the bottom whenever a new message is added
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages]);

    return (
        <div className='h-screen relative'>
            <div className='p-6'>
                <GoToBack currentPage={'Live chat'} previousPage={'/user-profile'} />
            </div>
            <div className='border-y-[0.5px] border-[#222225] w-screen'></div>
            <div className='chatboard'>
                <div
                    ref={chatContainerRef}
                    className='chatdialog flex flex-col w-full gap-6 px-6 justify-center overflow-y-auto'
                    style={{ maxHeight: 'calc(100vh - 112px)' }} // Ensure the chatbox stays within the viewable area
                >
                    {chatMessages.map((message, index) => (
                        <DialogItem
                            key={index}
                            content={message.content}
                            date={message.date}
                            type={message.type}
                            check={message.check}
                        />
                    ))}
                    {/* Reference to automatically scroll to */}
                    <div ref={chatEndRef} />
                </div>
                <div className='absolute bottom-0 inputbox rounded-b-lg border-[#222225] border'>
                    <input
                        onChange={handleInputChange}
                        value={inputData}
                        onKeyPress={handleKeyPress}
                        className='w-screen h-[56px] py-3 bg-[#131313] focus:outline-none px-3'
                    />
                </div>
            </div>
        </div>
    );
};

export default LiveChatPage;
