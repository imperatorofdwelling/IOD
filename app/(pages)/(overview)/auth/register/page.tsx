'use client'
import React from 'react';
import Image from 'next/image';
import InputField from '@/shared/ui/components/InputField';
import CheckboxWithLabel from '@/shared/ui/components/CheckboxWithLabel';
import Button from '@/shared/ui/components/Button';
import Divider from '@/shared/ui/components/Divider';
import { signIn } from 'next-auth/react';

interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const inputFields = [
    { placeholder: 'Name', type: 'text' },
    { placeholder: 'Email', type: 'email' },
    { placeholder: 'Password', type: 'password' },
    { placeholder: 'Confirm Password', type: 'password' },
  ];
  const handleGoogleSignUp = () => {
    signIn('google', { callbackUrl: '/' });
  };

  const handleTwitterSignUp = () => {
    signIn('twitter', { callbackUrl: '/' });
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
        <h1 className="mt-12 text-5xl font-bold text-white">Sign Up</h1>
        <form className="flex flex-col mt-6 w-full">
          {inputFields.map((field, index) => (
            <InputField key={index} placeholder={field.placeholder} type={field.type} />
          ))}
          <CheckboxWithLabel />
          <Button text="Sign up" />
        </form>
        <Divider
          onGoogleClick={handleGoogleSignUp}
          onTwitterClick={handleTwitterSignUp}
        />
        <p className="self-start mt-6 text-sm text-center w-full">
          <span className="text-stone-300">Already have an Account</span>{" "}
          <a href="login" className="font-medium text-sky-500">Sign-in</a>
        </p>
      </section>
      <footer className="flex shrink-0 self-center mt-20 bg-white h-[5px] rounded-[100px] w-[139px]" />
    </main>
  );
};

export default SignUpPage;