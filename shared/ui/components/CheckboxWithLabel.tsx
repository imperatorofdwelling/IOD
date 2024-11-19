import React from 'react';

const CheckboxWithLabel: React.FC = () => {
  return (
    <div className="flex gap-2 items-center mt-6 w-full text-sm text-sky-500">
      <input type="checkbox" id="terms-checkbox" />
      <label htmlFor="terms-checkbox" className="flex items-center cursor-pointer">        
        <span className="self-stretch my-auto w-[306px]">
          <span className="text-white">I read and agree to</span>{" "}
          <a href="#" className="font-medium text-sky-500">Terms and Conditions</a>
        </span>
      </label>
    </div>
  );
};

export default CheckboxWithLabel;