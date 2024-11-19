'use client'
import React from 'react';
import Image from 'next/image'
interface DividerProps {
  onGoogleClick: () => void;
  onTwitterClick: () => void;
}

const Divider: React.FC<DividerProps> = ({ onGoogleClick, onTwitterClick }) => {
  return (
    <div className="flex gap-2 justify-center items-center mt-6 w-full text-xs leading-none text-center text-white whitespace-nowrap">
      <button
        aria-label="Sign in with Google"
        onClick={onGoogleClick}
        className="flex items-center justify-center"
      >
        <Image src="/auth/google-icon.svg"
          width={40} height={40} alt="Google Icon" className="object-contain shrink-0 self-stretch my-auto"
        />
      </button>
      <div className="self-stretch my-auto">Or</div>
      <button
        aria-label="Sign in with Twitter"
        onClick={onTwitterClick}
        className="flex items-center justify-center"
      >
        <Image src="/auth/twitter-icon.svg"
          width={40} height={40} alt="Twitter Icon" className="object-contain shrink-0 self-stretch my-auto"
        />
      </button>
    </div>
  );
};

export default Divider;