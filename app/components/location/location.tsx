import Link from "next/link";
import { useContext } from "react";
import { CityContext } from "../../context/CityContext";
import styles from "../../styles/location.module.css";
import Checkmark from "../../../public/checkmark-icon.svg";

interface LocationProps {
  isModalOpen: boolean;  // Указываем, что isModalOpen имеет тип boolean
}

export default function Location({ isModalOpen }: LocationProps) {
  const { selectedCity } = useContext(CityContext);

  return (
    <div className={`${styles.firstBlock} ${isModalOpen ? styles.blurred : ''}`}>
      <p className={styles.location}>Location</p>
      <div className={styles.locationContainer}>
        <Link href="/city-selection" className={styles.locationName}>
        {selectedCity ? (
        <p> {selectedCity}</p>
      ) : "Choose the location"}
        </Link>
        <Link href="/city-selection">
          <Checkmark />
        </Link>
      </div>
    </div>
  );
}
