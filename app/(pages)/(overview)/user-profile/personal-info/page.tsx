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

interface IPropertiesClient {
    currentUser?: SafeUser | null
}


export const PersonalInfoPage: FC<IPropertiesClient> = ({ currentUser }) => {
    const { data: listings, isLoading } = useGetUserListingsById(
        currentUser?.id || ''
    )
    const PersonalInfoItems = [
        {
            title: 'Name',
            content: 'Your name',
            onClick: () => {}
        },
        {
            title: 'Email address',
            content: 'dedric3@gmail.com',
            onClick: () => {}
        },
        {
            title: 'Phone number',
            content: '(000)-000-0000',
            onClick: () => {}
        },
        {
            title: 'Date of birth',
            content: 'DD/MM/YYYY',
            onClick: () => {}
        },
        {
            title: 'Nationality',
            content: 'Select country/region you’re from',
            onClick: () => {}
        },
        {
            title: 'Gender',
            content: 'Select your gender',
            onClick: () => {}
        },

    ]
    return (
        <div>
            <div className='px-6 pb-6'>
                <GoToBack currentPage={'Personal Information'} previousPage={'/user-profile'} />
            </div>
            <div className='border-y-[0.5px] border-[222225] w-screen'></div>
            {PersonalInfoItems.map((item, index) => (
                <div>
                <PersonalInfoItem title={item.title} content={item.content} onClick={item.onClick} key={index} />
                <div className='border-y-[0.5px] border-[222225] w-screen'></div>
                </div>
            ))}
        </div>
    );
}

export default PersonalInfoPage 