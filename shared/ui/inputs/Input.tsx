'use client'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { BiRuble } from 'react-icons/bi'

interface IInput {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}
const Input: React.FC<IInput> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiRuble size={24} className="text-gray-700 absolute top-5 left-2" />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`peer w-full p-[12px] pt-[23px] font-light bg-neutral-900 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed border-[1px] border-opacity-0 ${
          formatPrice ? 'pl-9' : 'pl-4'
        } ${errors[id] ? 'border-red-500' : 'border-[#006BE6]'} ${
          errors[id] ? 'focus:border-red-500' : 'focus:border-[#006BE6] focus:border-[1px]'
        }`}
      />
      <label
        className={`absolute text-md duration-150 transorm -translate-y-3 top-5 z-10 origin-[0] pointer-events-none ${
          formatPrice ? 'left-9' : 'left-4'
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          errors[id] ? 'text-red-500' : 'text-zinc-400'
        }`}
      >
        {label}
      </label>
    </div>
  )
}

export default Input
