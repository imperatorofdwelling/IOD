'use client'
import { type FC } from 'react'
import Avatar from '@/shared/ui/Avatar';
import { SafeUser } from '@/types'
import Heading from '@/shared/ui/Heading';
import Image from 'next/image';
import {
    useGetUserListingsById,
    useMutationDeleteApartamentById,
} from 'shared/services/hooks'

import PersonalInfoItem from '@/shared/ui/PersonalInfoItem';
import GoToBack from '@/shared/ui/GoToBack';
import { Accordion, AccordionItem } from "@nextui-org/react";
import { ArrowUp } from 'public/citySelectionIcons/arrow-up';
import { ArrowDown } from 'public/citySelectionIcons/arrow-down';
import { FormEvent } from 'react';

interface IPropertiesClient {
    currentUser?: SafeUser | null
}


export const FAQPage: FC<IPropertiesClient> = ({ currentUser }) => {
    const { data: listings, isLoading } = useGetUserListingsById(
        currentUser?.id || ''
    )
    const defaultContent = 'Lorem ipsum dolor sit amet consectetur. Ac integer bibendum diam nunc est elit velit id et. Et nulla condimentum curabitur nisl non sed. '
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/submit', {
            method: 'POST',
            body: formData,
        })

        // Handle response if necessary
        const data = await response.json()
        // ...
    }
    return (
        <div>
            <div className='px-6 pb-6'>
                <GoToBack currentPage={'FAQ'} previousPage={'/user-profile'} />
            </div>
            <div className='border-y-[0.5px] border-[222225] w-screen'></div>
            <div>
                <div className='px-4'>
                    <Accordion selectionMode="multiple">
                        <AccordionItem
                            key="1"
                            aria-label="Settings"
                            indicator={({ isOpen }) => (isOpen ? <ArrowDown /> : <ArrowUp />)}
                            title="Lorem ipsum dolor sit amet consectetur Ac integer bibendum?"
                        >
                            <p className='text-sm font-normal text-[#757575]'>{defaultContent}</p>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className='border-y-[0.5px] border-[222225] w-screen'></div>
                <div className='px-4'>
                    <Accordion selectionMode="multiple">
                        <AccordionItem
                            key="1"
                            aria-label="Settings"
                            indicator={({ isOpen }) => (isOpen ? <ArrowDown /> : <ArrowUp />)}
                            title="Lorem ipsum dolor sit amet consectetur Ac integer bibendum?"
                        >
                            <p className='text-sm font-normal text-[#757575]'>{defaultContent}</p>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className='border-y-[0.5px] border-[222225] w-screen'></div>
                <div className='px-4'>
                    <Accordion selectionMode="multiple">
                        <AccordionItem
                            key="1"
                            aria-label="Settings"
                            indicator={({ isOpen }) => (isOpen ? <ArrowDown /> : <ArrowUp />)}
                            title="Lorem ipsum dolor sit amet consectetur Ac integer bibendum?"
                        >
                            <p className='text-sm font-normal text-[#757575]'>{defaultContent}</p>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className='border-y-[0.5px] border-[222225] w-screen'></div>
                <div className='px-4'>
                    <Accordion selectionMode="multiple">
                        <AccordionItem
                            key="1"
                            aria-label="Settings"
                            indicator={({ isOpen }) => (isOpen ? <ArrowDown /> : <ArrowUp />)}
                            title="Lorem ipsum dolor sit amet consectetur Ac integer bibendum?"
                        >
                            <p className='text-sm font-normal text-[#757575]'>{defaultContent}</p>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className='border-y-[0.5px] border-[222225] w-screen'></div>
            </div>
            <div className='flex flex-col items-center justify-center px-6'>
                <p className='py-6 font-medium text-xl'>Ask your question</p>
                <form onSubmit={onSubmit}  className='flex flex-col items-center justify-center gap-6 w-full'>
                    <input type="text" name="content" placeholder='Your question' className='text-sm font-normal rounded-lg p-5 radius border-[#29292C] border-solid bg-[#131313] w-full text-[#757575]'/>
                    <input type="text" name="email" placeholder='Email' className='text-sm font-normal rounded-lg p-5 radius border-[#29292C] border-solid bg-[#131313] w-full text-[#757575]'/>
                    <button type="submit" className='text-lg font-medium rounded-lg p-5 radius border-[#29292C] border-solid bg-[#131313] w-full  text-[#757575]'>Send</button>
                </form>
            </div>
        </div>
    );
}

export default FAQPage 