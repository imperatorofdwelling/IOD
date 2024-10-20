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


export const FAQPage: FC<IPropertiesClient> = ({ currentUser }) => {
    const { data: listings, isLoading } = useGetUserListingsById(
        currentUser?.id || ''
    )    
    return (
        <div>
            <div className='px-6 pb-6'>
                <GoToBack currentPage={'Live chat'} previousPage={'/user-profile'} />
            </div>
            <div className='border-y-[0.5px] border-[222225] w-screen'></div>            
        </div>
    );
}

export default FAQPage 