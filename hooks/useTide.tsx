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
      // Get current date and next day

      

      // Fetch current speed
      const currentSpeedResponse = await fetch(
        `https://api.stormglass.io/v2/weather/point?lat=${location?.coords?.latitude}&lng=${location?.coords?.longitude}&params=currentSpeed&start=${formatDate(today)}&end=${formatDate(tomorrow)}`,
        {
          headers: {
            'Authorization': Constants.expoConfig?.extra?.tideApiKey
          }
        }
      );
      const currentSpeedData = await currentSpeedResponse.json();

      // Fetch tide data
      const tideResponse = await fetch(
        `https://api.stormglass.io/v2/tide/extremes/point?lat=${location?.coords?.latitude}&lng=${location?.coords?.longitude}&start=${formatDate(today)}&end=${formatDate(tomorrow)}`,
        {
          headers: {
            'Authorization': Constants.expoConfig?.extra?.tideApiKey
          }
        }
      );
      const tideData = await tideResponse.json();
      
      // Merge the data with timestamp
      const mergedData = {
        currentSpeed: currentSpeedData,
        tide: tideData,
        timestamp: formatDate(today)
      };

      console.log("merge Data: ", mergedData);
      if(currentSpeedData.errors || tideData.errors || !tideData || !currentSpeedData) return;
      // Update state
      setTide(mergedData);

      // Store in AsyncStorage
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
        console.log("stored: ", storedTide)
        if (storedTide) {
          const parsedTide = JSON.parse(storedTide) as TideData;
          const today = new Date().toISOString().split('T')[0];
          
          // If stored data is not from today, refetch
          // if (parsedTide.timestamp !== today) {
          //   await getTide();
          // } else {
            setTide(parsedTide);
          // }
        } else {
          await getTide();
        }
      } catch (error) {
        console.error("Error loading tide data:", error);
      }
    };
    console.log(`https://api.stormglass.io/v2/weather/point?lat=${location?.coords?.latitude}&lng=${location?.coords?.longitude}&params=currentSpeed&start=${formatDate(today)}&end=${formatDate(tomorrow)}`)
    loadTide();
  }, [location]);

  return { tide };
}
