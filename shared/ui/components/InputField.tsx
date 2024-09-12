import React from 'react';
import clsx from 'clsx';

interface InputFieldProps {
  placeholder: string;
  type: string;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, type }) => {
  
  const inputClass = clsx(
    "gap-2.5 self-stretch px-4 py-5 w-full text-sm whitespace-nowrap rounded-lg border border-solid bg-zinc-900 border-zinc-800 min-h-[56px] text-neutral-500"
  )
  
  return (
    <div className="mt-2.5 w-full">
      <label htmlFor={`input-${placeholder.toLowerCase()}`} className="sr-only">{placeholder}</label>
      <input
        id={`input-${placeholder.toLowerCase()}`}
        type={type}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
};

export default InputField;