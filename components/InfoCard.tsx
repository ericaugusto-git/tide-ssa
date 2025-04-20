import { View, Text } from "react-native";
import { ReactNode } from "react";

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

export default function InfoCard({ icon, title, subtitle }: InfoCardProps) {
  return (
    <View style={{ flexDirection: "column", alignItems: "center", gap: 5 }}>
      <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'  }}>
        {icon}
      </View>
      <Text style={{ color: '#aeb0b4', fontWeight: 600, fontSize: 11 }}>{title}</Text>
      <Text style={{ fontSize: 9, fontWeight: 100, color: '#b3b5b9' }}>{subtitle}</Text>
    </View>
  );
} 