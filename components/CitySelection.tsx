"use client";

import React, { useState } from 'react';
import styles from './selection.module.css';

export default function CitySelection() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

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
    </div>
  );
}