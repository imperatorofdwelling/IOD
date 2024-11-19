'use strict'
import Image from 'next/image';
import styles from '../../styles/homepage.module.css'

interface IDetailedCard {
    states: {
        img: string,
        price: number,
        title: string,
        location: string,
        rate: number,
        beds: number,
        rooms: number,
    },
    onClick?: () => void,
    onClose?: () => void
}
export const DetailedCard = ({ states, onClose }: IDetailedCard) => {
    return (
        <div className={styles.hotelCard}>
            <div style={{
                backgroundImage: `url(${states.img})`,
                backgroundSize: 'cover', // To cover the entire div
                backgroundPosition: 'center', // Center the image
                width: '100%',
                height: '100%',
                minWidth: '250px',
                minHeight: '200px',
                borderRadius: '16px',
                position: 'relative'
            }}>
                <div>
                    <Image src={'/heart-icon.svg'} width={20} height={18} alt='' style={{ position: 'absolute', top: '30px', right: '20px'}}/>
                </div>
            </div>
            <div className={styles.hotelInfo}>
                <div className={styles.hotelInfoIndiv}>
                    <p>{states.title}</p>
                    <p>{`$${states.price}/night`}</p>
                </div>
                <div className={styles.hotelInfoIndiv}>
                    <div className={styles.hotelPropertyIndiv}>
                        <Image src={'/location-icon.svg'} alt='' width={16} height={16} />
                        <p className={styles.gray}>{states.location}</p>
                    </div>
                    <div className={styles.hotelPropertyIndiv}>

                        <Image src={'/starrate-icon.svg'} alt='' width={16} height={16} />
                        <p className={styles.gray}>{states.rate}</p>
                    </div>
                </div>
            </div>
            <div className={styles.hotelproperty}>
                <div className={styles.hotelPropertyIndiv}>
                    <Image src={'/homePageIcon/hotel.svg'} alt='' width={24} height={24} />
                    <p>{`Hotel`}</p>
                </div>
                <div className={styles.hotelPropertyIndiv}>
                    <Image src={'/bed-icon.svg'} alt='' width={24} height={24} />
                    <p>{`${states.beds} bed`}</p>
                </div>
                <div className={styles.hotelPropertyIndiv}>
                    <Image src={'/door-icon.svg'} alt='' width={24} height={24} />
                    <p>{`${states.rooms} room`}</p>
                </div>
            </div>
        </div>
    );
}

