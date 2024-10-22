'use client'
import Image from 'next/image'
import { IconType } from 'react-icons'
import { useRouter } from 'next/navigation' // Import the useRouter hook

interface IButton {
  currentPage?: string,
  previousPage?: string,
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType
}

const GoToBack: React.FC<IButton> = ({
  currentPage,
  previousPage,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  const router = useRouter(); // Initialize useRouter

  const handleGoBack = () => {
    if (disabled) return; // Prevent action if button is disabled
    // If a previous page URL is provided, navigate to it, otherwise go back
    if (previousPage) {
      router.push(previousPage);
    } else {
      router.back(); // This goes to the previous page in history
    }
  };

  return (
    <div className='relative flex items-center justify-center'>
      <div 
        className='absolute left-0 rounded-lg border border-soild border-[#1B1B1C] w-[48px] h-[48px] items-center justify-center flex bg-[#131313] cursor-pointer'
        onClick={handleGoBack} // Attach the click handler here
      >
        <Image src={'/citySelectionIcons/arrow-left.svg'} width={15} height={15} alt='' />
      </div>
      <div className='w-full flex items-center justify-center text-xl font-semibold'>{currentPage}</div>
    </div>
  )
}

export default GoToBack;
