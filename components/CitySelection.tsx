"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from './selection.module.css';

interface CityData {
  city: string;
  federal_district: string;
  fias_id: string;
  population: number;
  region_name: string;
}

export default function CitySelection() {
  const [cities, setCities] = useState<CityData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  useEffect(() => {
    async function fetchCities() {
      try {
        const { default: data } = await import('../cities.json');
        setCities(data as CityData[]);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    }
    fetchCities();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredCities = cities.filter(city =>
    city.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.form}>
      <div className={styles.container}>
        <div className={styles.searchBar}>
          <input
            type='text'
            placeholder='Enter the city name'
            className={styles.cityInput}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div>
        {searchQuery && (
          <ul className={styles.cityList}>
            {filteredCities.map((city) => (
              <li key={city.fias_id} className={styles.cityItem}>
                {city.city}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
}