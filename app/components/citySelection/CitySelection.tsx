"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import Link from 'next/link';

import styles from './selection.module.css';
import GoBackIcon from '../../public/goback-icon.svg';
import SearchIcon from '../../public/search-icon.svg';
import CheckmarkIcon from '../../public/checkmark-icon.svg';
import Location from '../../public/location-icon.svg' 

interface CityData {
  city: string;
  federal_district: string;
  fias_id: string;
  population: number;
  region_name: string;
}

export default function CitySelection() {
  const [cities, setCities] = useState<CityData[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    async function fetchCities() {
      try {
        const { default: data } = await import('../cities.json');
        setCities(data as CityData[]);
      } catch (error) {
        console.error('Data loading error:', error);
      }
    }
    fetchCities();
  }, []);

  const handleCitySelect = (cityData: CityData) => {
    setSelectedCity(cityData.city);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredCities = cities.filter(city =>
    city.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.form}>
      <div className={styles.container}>
        <div className={styles.goBack}>        
          <Link href="/" >
            <GoBackIcon className={styles.backBtn}/>
          </Link>
        </div>
        <div className={styles.searchBar}>
          {searchQuery === '' && <SearchIcon className={styles.searchIcon} />}
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
              <li
                key={city.fias_id}
                onClick={() => handleCitySelect(city)}
                className={`${styles.cityItem} ${selectedCity === city.city ? styles.selected : ''}`}>
                <span><Location className={styles.locationIcon} /></span>
                <span>{city.city}</span>
                {selectedCity === city.city && <CheckmarkIcon className={styles.checkmarkIcon} />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
