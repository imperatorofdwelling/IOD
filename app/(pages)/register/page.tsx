'use client'

import s from './s.module.scss'
import Heading from '@/shared/ui/Heading'
import Input from '@/shared/ui/inputs/Input'
import IconButton from '@/shared/ui/Register/IconButton'
import TwitterButton from '@/shared/ui/Register/TwitterButton'
import SignButton from '@/shared/ui/Register/SignButton'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { FcGoogle } from 'react-icons/fc'
import RegisterHeader from '@/shared/ui/Register/RegisterHeader'
import Link from 'next/link'
import { TERipple } from 'tw-elements-react'

const Register = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
        email: '',
        password: '',
        },
    })

    return (
        <div className='h-screen w-full bg-black font-sans'>
            <div className='h-full flex flex-col justify-center items-center max-w-[500px] mx-auto'>
                <div className='text-[14px] flex flex-col gap-[24px] min-w-[320px] w-full p-[24px]'>
                    <RegisterHeader title='Sign Up'/>
                    <div className="flex flex-col gap-[10px]">
                        <Input
                            id="uerName"
                            type="text"
                            label="UserName"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input
                            id="email"
                            type="email"
                            label="Email"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input
                            id="password"
                            type="password"
                            label="Password"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input
                            id="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>
                    <div className='flex gap-2 ps-1 items-center'>
                        <TERipple>
                            <div className={s.form_group}>
                                <input type="checkbox" id="tercon"/>
                                <label htmlFor='tercon'></label>
                            </div>
                        </TERipple>
                        <div className='text-[#757575] ps-1'>
                            I read and agree to <span className="text-[#1DA1F2] cursor-pointer hover:underline transition font-semibold">Terms and Conditions</span>
                        </div>
                    </div>
                    <SignButton lavel={'Sign up'}/>
                    <div className="flex gap-2 justify-center">
                        <IconButton
                            icon={FcGoogle}
                        />
                        <span className='text-[12px] mt-[7px]'>Or</span>
                        <TwitterButton/>
                    </div>
                    <div className="text-neutral-500 text-center font-light flex justify-center flex-row items-center gap-2">
                        <div>Already have an Account</div>
                        <Link
                            className="text-[#1DA1F2] cursor-pointer hover:underline transition font-semibold"
                            href="/login"
                        >
                            Sign-in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register
