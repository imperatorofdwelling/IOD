import React from 'react';

interface InputFieldProps {
  placeholder: string;
  type: string;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, type }) => {
  return (
    <div className="mt-2.5 w-full">
      <label htmlFor={`input-${placeholder.toLowerCase()}`} className="sr-only">{placeholder}</label>
      <input
        id={`input-${placeholder.toLowerCase()}`}
        type={type}
        placeholder={placeholder}
        className="gap-2.5 self-stretch px-4 py-5 w-full text-sm whitespace-nowrap rounded-lg border border-solid bg-zinc-900 border-zinc-800 min-h-[56px] text-neutral-500"
      />
    </div>
  );
};

export default InputField;