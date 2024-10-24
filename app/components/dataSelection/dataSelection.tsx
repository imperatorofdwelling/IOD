import React, { useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from "../../styles/data.module.css"; 
import HousesIcon from "@/public/homePageIcon/houses.svg"; 
import ResidentsIcon from "@/public/homePageIcon/residents.svg";
import DatesIcon from "@/public/homePageIcon/dates.svg";
import ApartmentIcon from "@/public/homePageIcon/Apartment.svg";
import HotelIcon from "@/public/homePageIcon/Hotel.svg";
import NavigationIcon from "@/public/goback-icon.svg";

interface DataSelectionProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}


export default function DataSelection({ setIsModalOpen, isModalOpen }: DataSelectionProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<DateRange | undefined>();
  const [month, setMonth] = useState(new Date());
  const [isFlexible, setIsFlexible] = useState(false);

  const handleCheckboxChange = (type: string) => {
    setSelectedTypes(prevSelectedTypes =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter(item => item !== type)
        : [...prevSelectedTypes, type]
    );
  };

  const handleApplyClick = () => setIsModalOpen(false);
  const closeDateModal = () => setIsDateModalOpen(false);
  
  const handleDateChange = (range: DateRange | undefined) => setSelectedDays(range);
  
  const handlePrevMonth = () => {
    setMonth(prevMonth => {
      const month = new Date(prevMonth);
      month.setMonth(month.getMonth() - 1);
      return month;
    });
  };

  const handleNextMonth = () => {
    setMonth(prevMonth => {
      const month = new Date(prevMonth);
      month.setMonth(month.getMonth() + 1);
      return month;
    });
  };

  const monthCaptionStyle = {
    display:"none"
  };
  

  return (
    <>
      <div className={`${styles.secondBlock} ${isModalOpen || isDateModalOpen ? styles.blurred : ''}`}>
        <div className={styles.selectionBlock}>
          <p className={styles.selectionTitle}>Enter selection data</p>
          <div className={styles.housesContainer} onClick={() => setIsModalOpen(true)}>
            <HousesIcon />
            <p>{selectedTypes.length > 0 ? selectedTypes.join(', ') : 'Type of dwelling you need'}</p>
          </div>
          <div className={styles.datesContainer} onClick={() => setIsDateModalOpen(true)}>
            <DatesIcon />
            <p>{selectedDays ? `${selectedDays.from?.toLocaleDateString()} - ${selectedDays.to?.toLocaleDateString()}` : 'Dates'}</p>
          </div>
          <div className={styles.residentsContainer}>
            <ResidentsIcon />
            <p>Residents</p>
          </div>
          <button className={styles.applyBtn}>Apply</button>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <p>Type of dwelling</p>
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <HousesIcon />
                <p>House</p>
                <input 
                  type="checkbox" 
                  value="House" 
                  onChange={() => handleCheckboxChange('House')}
                  checked={selectedTypes.includes('House')}
                />
              </label>
              <label className={styles.checkboxLabel}>
                <ApartmentIcon className={styles.apartmentIcon} />
                Apartment
                <input 
                  type="checkbox" 
                  value="Apartment" 
                  onChange={() => handleCheckboxChange('Apartment')}
                  checked={selectedTypes.includes('Apartment')}
                />
              </label>
              <label className={styles.checkboxLabel}>
                <HotelIcon className={styles.hotelIcon}/>
                Hotel
                <input 
                  type="checkbox" 
                  value="Hotel" 
                  onChange={() => handleCheckboxChange('Hotel')}
                  checked={selectedTypes.includes('Hotel')}
                />
              </label>
            </div>
            <button className={styles.modalApplyButton} onClick={handleApplyClick}>Apply</button>
          </div>
        </div>
      )}

      {isDateModalOpen && (
        <div className={styles.dateModalOverlay} onClick={closeDateModal}>
          <div className={styles.dateModal} onClick={(e) => e.stopPropagation()}>
            <p className={styles.bookingLabel}>You are booking for</p>
            <div className={styles.calendar}>
              <div className={styles.header}>
                <button className={styles.prevNav} onClick={handlePrevMonth}>
                  <NavigationIcon />
                </button>
                <p className={styles.monthLabel}>{month.toLocaleString('en-ru', { month: 'long', year: 'numeric' })}</p>
                <button className={styles.nextNav} onClick={handleNextMonth}>
                  <NavigationIcon />
                </button>
              </div>
              <DayPicker
                mode="range"
                selected={selectedDays}
                onSelect={handleDateChange}
                month={month} 
                hideNavigation
                showOutsideDays   
                className={styles.dayPicker}
                styles={{
                  month_caption: monthCaptionStyle
                }} 
              />
            </div>
            <div className={styles.flexibleContainer}>
              <label>I am flexible</label>
              <input
                type="checkbox"
                checked={isFlexible}
                onChange={() => setIsFlexible(prev => !prev)} 
              />
            </div>
            <button className={styles.modalApplyButton} onClick={closeDateModal}>Apply</button>
          </div>
        </div>
      )}
    </>
  );
}



