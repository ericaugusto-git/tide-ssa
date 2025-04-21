import { Text, StyleSheet, TextProps, TextStyle } from 'react-native';

interface CustomTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
}

export default function CustomText({ style, ...props }: CustomTextProps) {
  const getFontFamily = (weight: string | number | undefined) => {
    switch (weight) {
      case '100':
      case '200':
      case '300':
      case '400':
      case 'normal':
        return 'Nunito_400Regular';
      case '500':
      case 'medium':
        return 'Nunito_500Medium';
      case '600':
      case 'semibold':
        return 'Nunito_600SemiBold';
      case '700':
      case 'bold':
        return 'Nunito_700Bold';
      case '800':
      case '900':
      case 'black':
        return 'Nunito_900Black';
      default:
        return 'Nunito_400Regular';
    }
  };
  const fontFamily = getFontFamily(Array.isArray(style) ? style[0]?.fontWeight : style?.fontWeight);
  if ((style as TextStyle)?.fontWeight) {
    delete (style as TextStyle).fontWeight;
  }
  return <Text style={[{ fontFamily }, style]} {...props} />;
}