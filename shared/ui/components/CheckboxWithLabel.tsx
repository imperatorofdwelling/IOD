import React from 'react';

const CheckboxWithLabel: React.FC = () => {
  return (
    <div className="flex gap-2 items-center mt-6 w-full text-sm text-sky-500">
      <input type="checkbox" id="terms-checkbox" className="sr-only" />
      <label htmlFor="terms-checkbox" className="flex items-center cursor-pointer">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd4911fc34a5c394af4591da1ee71932bb5899992ed40e68ed30dd97946a0f20?placeholderIfAbsent=true&apiKey=6b438dbe2e8a48a5baec60fd6590cb02" alt="" className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square" />
        <span className="self-stretch my-auto w-[306px]">
          <span className="text-white">I read and agree to</span>{" "}
          <a href="#" className="font-medium text-sky-500">Terms and Conditions</a>
        </span>
      </label>
    </div>
  );
};

export default CheckboxWithLabel;