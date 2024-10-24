'use client'
import { type FC } from 'react'
import Avatar from '@/shared/ui/Avatar';
import { SafeUser } from '@/types'
import Heading from '@/shared/ui/Heading';
import Link from 'next/link';
import Image from 'next/image';
import {
    useGetUserListingsById,
    useMutationDeleteApartamentById,
} from 'shared/services/hooks'

import { Accordion, AccordionItem } from "@nextui-org/react";
import { SettingIcon } from 'public/citySelectionIcons/setting-icon';
import { HearingIcon } from 'public/citySelectionIcons/hearing-icon';
import { PeopleGroupIcon } from 'public/citySelectionIcons/people-group-icon';
import { ArrowUp } from 'public/citySelectionIcons/arrow-up';
import { ArrowDown } from 'public/citySelectionIcons/arrow-down';
import GoToBack from '@/shared/ui/GoToBack';

interface IPropertiesClient {
    currentUser?: SafeUser | null
}


export const UserPropertiesPage: FC<IPropertiesClient> = ({ currentUser }) => {
    const { data: listings, isLoading } = useGetUserListingsById(
        currentUser?.id || ''
    )

    return (
        <div>
            <div className='px-6 pb-6'>
                <GoToBack currentPage={'Profile'} previousPage={'/user-profile'} />
            </div>
            <div className='border-y-[0.5px] border-[222225] w-screen'></div>
            <div className='flex items-center  w-full justify-start gap-6 p-6'>
                <div className='relative'>
                    <Image
                        src="/images/defaultavatar3.png" // Placeholder image, replace with actual image URL
                        alt=''
                        width={92}
                        height={92}

                    />
                    <Avatar
                        src="/citySelectionIcons/camera-icon.svg"
                        className="absolute bottom-0 left-0"
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <p>Name</p>
                    <div className='flex gap-3'>
                        <Image
                            src="/citySelectionIcons/mailbox-icon.svg"
                            alt=''
                            width={19}
                            height={13}
                        />
                        <p className='text-[#757575]'>@gmail.com</p>
                    </div>
                    <div className='flex gap-3'>
                        <Image
                            src="/citySelectionIcons/phone-icon.svg"
                            alt=''
                            width={19}
                            height={13}
                        />
                        <p className='text-[#757575]'>(000)-000-0000</p>
                    </div>
                </div>
            </div>
            <div className='border-y-[0.5px] border-[222225] w-screen'></div>
            <div>
                <ul className='flex flex-col gap-6 p-6'>
                    <li className='text-base font-medium'>
                        <Link href="/user-profile/personal-info">Personal Information</Link>
                    </li>
                    <li className='text-base font-medium'>Booking History</li>
                    <li className='text-base font-medium'>Account Settings</li>
                    <li className='text-base font-medium'>Loyalty Programs and Discounts</li>
                </ul>
                <div className='border-y-[0.5px] border-[222225] w-screen'></div>
                <div className='px-4'>
                    <Accordion selectionMode="multiple">
                        <AccordionItem
                            key="1"
                            aria-label="Settings"
                            startContent={<SettingIcon className="text-primary" />}
                            indicator={({ isOpen }) => (isOpen ? <ArrowDown /> : <ArrowUp />)}
                            title="Settings"
                        >
                            <ul className='text-sm text-[#006BE6] underline flex flex-col gap-6 pb-6'>
                                <li>Subscription Management</li>
                                <li>Payment method</li>
                                <li>Security settings, face ID etc.</li>
                            </ul>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className='border-y-[0.5px] border-[222225] w-screen'></div>
                <div className='px-4'>
                    <Accordion selectionMode="multiple">
                        <AccordionItem
                            key="2"
                            aria-label="Help and support "
                            startContent={<HearingIcon />}
                            indicator={({ isOpen }) => (isOpen ? <ArrowDown /> : <ArrowUp />)}
                            title="Help and support "
                        >
                            <ul className='text-sm text-[#006BE6] underline flex flex-col gap-6 pb-6'>
                                <li>
                                    <Link href="/user-profile/faq">Frequently Asked Questions (FAQ)</Link>
                                </li>
                                <li>
                                    <Link href="/user-profile/contact-details">contact-details</Link>
                                </li>
                                <li>
                                    <Link href="/user-profile/live-chat">live-chat</Link>
                                </li>
                                <li>Privacy Policy</li>
                                <li>Terms of Use</li>
                            </ul>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className='border-y-[0.5px] border-[222225] w-screen'></div>
                <div className='px-4'>
                    <Accordion selectionMode="multiple">
                        <AccordionItem
                            key="3"
                            aria-label="About us"
                            classNames={{ subtitle: "text-warning" }}
                            startContent={<PeopleGroupIcon className="text-warning" />}
                            indicator={({ isOpen }) => (isOpen ? <ArrowDown /> : <ArrowUp />)}
                            title="About us"
                        >
                            <ul className='text-sm text-[#006BE6] underline flex flex-col gap-6 pb-6'>
                                <li>Company Information</li>
                                <li>Our Mission and Values</li>
                            </ul>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className='border-y-[0.5px] border-[222225] w-screen'></div>
            </div>
        </div>
    );
}

export default UserPropertiesPage