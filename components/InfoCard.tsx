import { View, Text } from "react-native";
import { ReactNode } from "react";
import CustomText from "./CustomText";

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

export default function InfoCard({ icon, title, subtitle }: InfoCardProps) {
  return (
    <View style={{ flexDirection: "column", alignItems: "center", gap: 5 }}>
      <View style={{ backgroundColor: '#cee2e2', width: 40, height: 40, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'  }}>
        {icon}
      </View>
      <CustomText style={{ color: '#aeb0b4', fontWeight: '700', fontSize: 11 }}>{title}</CustomText>
      <CustomText style={{ fontSize: 9, fontWeight: '800', color: '#b3b5b9' }}>{subtitle}</CustomText>
    </View>
  );
} 