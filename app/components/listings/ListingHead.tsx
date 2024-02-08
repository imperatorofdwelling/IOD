import useCities from '@/hooks/useCities'
import { SafeUser } from '@/types'
import Heading from '../Heading'
import Image from 'next/image'
import HeartButton from '../HeartButton'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface IListingHead {
  title: string
  imageSrc: string[]
  locationValue: string
  id: string
  currentUser?: SafeUser | null
}

const ListingHead: React.FC<IListingHead> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCities()
  const location = getByValue(locationValue)
  return (
    <>
      <Heading title={title} subtitle={`${location?.value}`} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Carousel>
          <CarouselContent>
            {imageSrc.map((src, index) => (
              <CarouselItem key={index}>
                <Image
                  alt={`Listing Image ${index + 1}`}
                  src={src}
                  fill
                  className="object-cover w-full h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}

export default ListingHead
