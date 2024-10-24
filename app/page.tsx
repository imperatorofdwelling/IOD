"use client";

import { useState, useContext } from 'react';
import { CityContext, CityProvider } from './context/CityContext'; 
import Location from './components/location/location';
import DataSelection from "./components/dataSelection/dataSelection"
import styles from './styles/page.module.css'

export default function Home() {
  const { selectedCity } = useContext(CityContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  console.log('Home Selected City:', selectedCity)

  return (   
    <main className={styles.main}>         
      <div className={styles.container}>
        <Location isModalOpen={isModalOpen}/>
        <DataSelection setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}  />
      </div>
    </main>
    
  );
}
