import { useFonts, Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold, Nunito_900Black } from '@expo-google-fonts/nunito';
import { Stack } from 'expo-router';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_900Black
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{headerShown:false}}/>;
}
