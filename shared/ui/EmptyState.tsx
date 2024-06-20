'use client'

import { useRouter } from 'next/navigation'
import Button from './Button'
import Heading from './Heading'

interface IEmptyState {
  title?: string
  subtitle?: string
  showReset?: boolean
}

const EmptyState: React.FC<IEmptyState> = ({
  title = 'Ничего не найдено',
  subtitle = 'Попробуйте удалить фильтры',
  showReset,
}) => {
  const router = useRouter()

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Удалить фильтры"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  )
}

export default EmptyState
