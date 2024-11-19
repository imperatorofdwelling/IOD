'use strict'
import Image from 'next/image';
import styles from '../../styles/homepage.module.css'

interface IStateCard {
    states: {
        icon: string,
        title: string,
        from: string,
        to: string,
        count: number,
    },
    onClick?: () => void,
    onClose?: () => void
}
export const StateCard = ({ states, onClose }: IStateCard) => {
    return (
        <div className={styles.stateCard}>
            <div className={styles.stateContent}>
                <Image src={states.icon} width={24} height={24} alt= '' />
                <div>
                    <p className={styles.stateTitle}>{states.title}</p>
                    <p className={styles.stateDuration}>{`${states.from} - ${states.to}`}</p>
                    <p className={styles.stateCount}>{`${states.count} residents`}</p>
                </div>
            </div>
            <div className={styles.stateClose} onClick={onClose}>
                <Image src={'/cross-Icons.svg'} width={10} height={10} alt='close' />
            </div>
        </div>
    );
}

