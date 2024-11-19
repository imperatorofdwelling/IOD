'use client'
import React from 'react';
import Image from 'next/image';
import InputField from '@/shared/ui/components/InputField';
import Button from '@/shared/ui/components/Button';
import Divider from '@/shared/ui/components/Divider';
import { signIn } from 'next-auth/react'

interface SignUpPageProps { }

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const inputFields = [
    { placeholder: 'Email', type: 'email' },
    { placeholder: 'Password', type: 'password' },
  ];
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' }); // Redirect after successful Google login
  };

  const handleTwitterSignIn = () => {
    signIn('twitter', { callbackUrl: '/' }); // Redirect after successful Twitter login
  };
  return (
    <main className="flex overflow-hidden flex-col pb-3 pl-6 pr-6 mx-auto w-full max-w-[480px]">
      <section className="flex flex-col justify-center mt-10 w-full">
        <div className='flex items-center justify-between mb-10'>
          <Image src="/images/logo-light.svg"
            width={64} height={64} alt="Sign Up Logo" className="object-contain aspect-square"
          />
          <p className="text-sm font-medium text-[#1DA1F2]">Skip</p>
        </div>
        <h1 className="mt-12 text-5xl font-bold text-white">Sign In</h1>
        <form className="flex flex-col mt-6 w-full">
          {inputFields.map((field, index) => (
            <InputField key={index} placeholder={field.placeholder} type={field.type} />
          ))}
          <a className='flex justify-end mt-3 text-blue-400'>Forgot your password?</a>
          <Button text="Sign in" />
        </form>
        <Divider
          onGoogleClick={handleGoogleSignIn}
          onTwitterClick={handleTwitterSignIn}
        />
        <p className="self-start mt-6 text-sm text-center w-full">
          <span className="text-stone-300">Already have an Account</span>{" "}
          <a href="register" className="font-medium text-sky-500">Sign-up</a>
        </p>
      </section>
    </main>
  );
};

export default SignUpPage;