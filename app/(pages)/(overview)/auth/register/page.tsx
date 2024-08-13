import React from 'react';
import InputField from '@/shared/ui/components/InputField';
import CheckboxWithLabel from '@/shared/ui/components/CheckboxWithLabel';
import Button from '@/shared/ui/components/Button';
import Divider from '@/shared/ui/components/Divider';

interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const inputFields = [
    { placeholder: 'Name', type: 'text' },
    { placeholder: 'Email', type: 'email' },
    { placeholder: 'Password', type: 'password' },
    { placeholder: 'Confirm Password', type: 'password' },
  ];

  return (
    <main className="flex overflow-hidden flex-col pb-3 pl-6 pr-6 mx-auto w-full max-w-[480px]">
      <section className="flex flex-col justify-center mt-10 w-full">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7951d47dae5a15cbf8faa4483c59d219a07fed5d52fc6d5f06e8d4a9241e4831?placeholderIfAbsent=true&apiKey=6b438dbe2e8a48a5baec60fd6590cb02" alt="Sign Up Logo" className="object-contain w-16 aspect-square" />
        <h1 className="mt-6 text-5xl font-bold text-white">Sign Up</h1>
        <form className="flex flex-col mt-6 w-full">
          {inputFields.map((field, index) => (
            <InputField key={index} placeholder={field.placeholder} type={field.type} />
          ))}
          <CheckboxWithLabel />
          <Button text="Sign up" />
        </form>
        <Divider />
        <p className="self-start mt-6 text-sm text-center w-full">
          <span className="text-stone-300">Already have an Account</span>{" "}
          <a href="#" className="font-medium text-sky-500">Sign-up</a>
        </p>
      </section>
      <footer className="flex shrink-0 self-center mt-20 bg-white h-[5px] rounded-[100px] w-[139px]" />
    </main>
  );
};

export default SignUpPage;