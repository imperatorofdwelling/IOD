import EmptyState from 'shared/ui/EmptyState'
import {
    getCurrentUser,
    getListingsUserId,
} from 'shared/services/server-actions'
import { StateCard } from '@/components/homepage/stateCard'
import { DetailedCard } from '@/components/homepage/detailedCard'
import styles from '../../../styles/homepage.module.css'

const stateList = [
    {
        icon: '/homePageIcon/houses.svg',
        title: 'House in Moscow',
        from: 'Fri, 16 Aug',
        to: 'Sun, 18 Aug',
        count: 3
    },
    {
        icon: '/homePageIcon/Hotel.svg',
        title: 'Hotels in Moscow',
        from: 'Fri, 16 Aug',
        to: 'Sun, 18 Aug',
        count: 3
    },
    {
        icon: '/homePageIcon/Apartment.svg',
        title: 'Aparts in Moscow',
        from: 'Fri, 16 Aug',
        to: 'Sun, 18 Aug',
        count: 3
    },
]

const hotelsList = [
    {
        img: '/hotels/hotel_1.jfif',
        price: 120,
        title: 'Hotel Moonlight',
        location: 'st. Star, 12',
        rate: 4.5,
        beds: 2,
        rooms: 2,
    },
    {
        img: '/hotels/hotel_2.jfif',
        price: 120,
        title: 'Hotel Moonlight',
        location: 'st. Star, 12',
        rate: 4.5,
        beds: 2,
        rooms: 2,
    },
    {
        img: '/hotels/hotel_3.jfif',
        price: 120,
        title: 'Hotel Moonlight',
        location: 'st. Star, 12',
        rate: 4.5,
        beds: 2,
        rooms: 2,
    },
    {
        img: '/hotels/hotel_4.jfif',
        price: 120,
        title: 'Hotel Moonlight',
        location: 'st. Star, 12',
        rate: 4.5,
        beds: 2,
        rooms: 2,
    },
    {
        img: '/hotels/hotel_5.jfif',
        price: 120,
        title: 'Hotel Moonlight',
        location: 'st. Star, 12',
        rate: 4.5,
        beds: 2,
        rooms: 2,
    }
]
const HomePage = async () => {
    // const currentUser = await getCurrentUser()

    // if (!currentUser) {
    //     return (
    //         <EmptyState title="Не авторизован" subtitle="Пожалуйста войдите" />
    //     )
    // }

    // const listings = await getListingsUserId(currentUser.id)

    // if (!listings.length) {
    //     return <EmptyState title="Нет  квартир" />
    // }

    return (<>
        <div className={styles.stateCardList}>
            {stateList && stateList.map((stateItem, index) => (
                <StateCard states={stateItem} key={index} />
            ))}
        </div>
        <div className={styles.stateCardList}>        
            {hotelsList && hotelsList.map((hotelItem, index) => (
                <DetailedCard states={hotelItem} key={index} />

            ))}
        </div>
    </>)

}

export default HomePage
