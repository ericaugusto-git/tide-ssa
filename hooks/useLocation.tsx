import { useEffect, useState } from "react";
import * as Location from 'expo-location';

function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [waitingGpsConsent, setWaitingGpsConsent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      setWaitingGpsConsent(true);
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setError('Error getting location');
        console.error(error);
      } finally {
        setWaitingGpsConsent(false);
      }
    };

    if (!location) {
      fetchLocation();
    }
  }, []);

  return { location, waitingGpsConsent, error };
}

export default useLocation; 