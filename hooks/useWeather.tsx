import moment from "moment";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import useLocation from './useLocation';

function useWeather() {
  const wttrApiUrl = 'https://api.openweathermap.org/data/2.5';
  const { location, waitingGpsConsent, error: locationError } = useLocation();
  const [weather, setWeather] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const lang = 'pt_br';

  const fetchWeather = async () => {
    if (!location) return;

    try {
      const weatherReq = await fetch(
        `${wttrApiUrl}/weather/?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&lang=${lang}&APPID=${Constants.expoConfig?.extra?.weatherApiKey}`
      );
      const weather = await weatherReq.json();
      
      const weatherObj = {
        weather,
        lang,
        lastUpdated: moment().toISOString()
      };
      await AsyncStorage.setItem("weather", JSON.stringify(weatherObj));
      setWeather(weatherObj);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError('Error fetching weather data');
    }
  };

  useEffect(() => {
    const loadStoredWeather = async () => {
      try {
        const storedWeather = await AsyncStorage.getItem("weather");
        
        if (storedWeather) {
          const parsedWeather = JSON.parse(storedWeather);
          const lastUpdated = moment(parsedWeather.lastUpdated);
          const now = moment();
          const hoursDiff = now.diff(lastUpdated, 'hours');

          if (hoursDiff >= 3) {
            fetchWeather();
          } else {
            setWeather(parsedWeather);
          }
        } else if (location) {
          fetchWeather();
        }
      } catch (error) {
        console.error('Error loading stored weather:', error);
      }
    };

    loadStoredWeather();
  }, [location]);

  return weather?.weather;
}

export default useWeather;