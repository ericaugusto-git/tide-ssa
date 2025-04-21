import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import useLocation from "./useLocation";
import Constants from "expo-constants";
import 'moment/locale/pt-br'
import moment from "moment";

interface TideData {
  currentSpeed: any;
  tide: any;
  timestamp: string;
}
export function useTide() {
  const [tide, setTide] = useState<TideData | undefined>();
  const { location } = useLocation();
  
  const formatDate = (date: string) => date.split('T')[0];
  const today = moment().format();
  const tomorrow = moment().add(1, 'days').format();
  const getTide = async () => {
    try {
      const currentSpeedResponse = await fetch(
        `https://api.stormglass.io/v2/weather/point?lat=${location?.coords?.latitude}&lng=${location?.coords?.longitude}&params=currentSpeed&start=${formatDate(today)}&end=${formatDate(tomorrow)}`,
        {
          headers: {
            'Authorization': Constants.expoConfig?.extra?.tideApiKey
          }
        }
      );
      const currentSpeedData = await currentSpeedResponse.json();
      const tideResponse = await fetch(
        `https://api.stormglass.io/v2/tide/extremes/point?lat=${location?.coords?.latitude}&lng=${location?.coords?.longitude}&start=${formatDate(today)}&end=${formatDate(tomorrow)}`,
        {
          headers: {
            'Authorization': Constants.expoConfig?.extra?.tideApiKey
          }
        }
      );
      const tideData = await tideResponse.json();
      
      const mergedData = {
        currentSpeed: currentSpeedData,
        tide: tideData,
        timestamp: formatDate(today)
      };
      if(currentSpeedData.errors || tideData.errors || !tideData || !currentSpeedData) return;
      setTide(mergedData);
      await AsyncStorage.setItem("tide", JSON.stringify(mergedData));
    } catch (error) {
      console.error("Error fetching tide data:", error);
    }
  };

  useEffect(() => {
    const loadTide = async () => {
      try {
        if(!location) return;
        const storedTide = await AsyncStorage.getItem("tide");
        if (storedTide) {
          const parsedTide = JSON.parse(storedTide) as TideData;
          const today = new Date().toISOString().split('T')[0];
          
          // If stored data is not from today, refetch
          if (parsedTide.timestamp !== today) {
            await getTide();
          } else {
          }
          setTide(parsedTide);
        } else {
          await getTide();
        }
      } catch (error) {
        console.error("Error loading tide data:", error);
      }
    };
    loadTide();
  }, [location]);

  return { tide };
}
