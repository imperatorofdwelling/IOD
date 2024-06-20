import { useMemo } from 'react';
import initialCities from '../../cities.json';

interface City {
    value: string;
    region: string;
    coordsLat: string;
    coordsLon: string;
}

const useCities = () => {
    const formattedCities: City[] = useMemo(() =>
        initialCities.map(city => ({
            value: city.city,
            region: city.region_name,
            coordsLat: city.lat,
            coordsLon: city.lon,
        })), []);

    const getAll = () => formattedCities;

    const getByValue = (value: string) => formattedCities.find(city => city.value === value);

    const getByRegion = (region: string) => formattedCities.filter(city => city.region === region);

    return { getAll, getByValue, getByRegion };
};

export default useCities;
