import { Text, View, Image } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import useWeather from "@/hooks/useWeather";
import { calcularFaseDaLua, classificarCorrenteza, converterCorrentezaParaKmh, padding } from "@/utils/utils";
import moment from "moment";
import Svg, { Path } from "react-native-svg";
import HighTideSvg from "@/assets/high_tide.svg";
import LowTideSvg from "@/assets/low_tide.svg";
import Current from "@/assets/current.svg";
import { useTide } from "@/hooks/useTide";
import { useEffect, useState } from "react";
import InfoCard from "@/components/InfoCard";
moment.locale("pt-br");

export default function Index() {
  const weather = useWeather();
  const { tide } = useTide();
  const [closestTide, setClosestTide] = useState<any>({});
  const [closestCurrent, setClosestCurrent] = useState<any>({});
  const currentSpeed = tide?.currentSpeed;
  const tideForecast = tide?.tide;
  const labelMare: any = {
    low: "Maré baixa",
    high: "Maré alta",
  };
  const now = moment().locale("pt-br");
  // Find the closest
  console.log("now: ", now);
  const date = now.format("LLLL");
  useEffect(() => {
    console.log("forecast: ", tide);
    if (tideForecast) {
      console.log("tideForecast: ", tideForecast);
      const closest = tideForecast.data.reduce(
        (
          prev: { time: moment.MomentInput },
          curr: { time: moment.MomentInput }
        ) => {
          const prevDiff = Math.abs(moment.utc(prev.time).diff(now.format()));
          const currDiff = Math.abs(moment.utc(curr.time).diff(now.format()));
          return currDiff < prevDiff ? curr : prev;
        }
      );
      const closestCurrent = currentSpeed.hours.reduce(
        (
          prev: { time: moment.MomentInput },
          curr: { time: moment.MomentInput }
        ) => {
          // console.log("prev: ",moment.utc(curr.time).toString()," actual time: " ,curr.time);
          // console.log("now: ", moment().format());
          const prevDiff = Math.floor(moment.utc(prev.time).diff(now));
          const currDiff = Math.floor(moment.utc(curr.time).diff(now));
          return currDiff < prevDiff ? curr : prev;
        }
      );
      setClosestTide(closest);
      setClosestCurrent(closestCurrent);
    }
  }, [tide]);
  console.log("weather: ", calcularFaseDaLua());
  return (
    <View
      style={{
        backgroundColor: "#f6f8fc",
        height: "100%",
        ...padding(10),
      }}
    >
      <View style={{ flexDirection: "column", gap: 5 }}>
        <Text style={{ color: "#b3b5b9", fontWeight: "bold" }}>{date}</Text>
        {weather?.weather?.name && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 5,
            }}
          >
            <Octicons name="location" size={18} color="black" />
            <Text style={{ fontWeight: "bold" }}>
              {weather?.weather?.name},
            </Text>
            <Text style={{ color: "#b3b5b9", fontWeight: "bold" }}>
              {weather?.weather?.sys?.country}
            </Text>
          </View>
        )}
      </View>
      <View style={{flexDirection: "column", alignItems: "center", gap: 20}}>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          {closestTide.type === "high" ? (
            <HighTideSvg width={100} height={100} />
          ) : (
            <LowTideSvg width={100} height={100}></LowTideSvg>
          )}
          <Text>{labelMare[closestTide?.type]}</Text>
        </View>
        <View style={{flexDirection: "row", alignItems: "center", gap: 20}}>
          <InfoCard 
            icon={<Current scale={0.6} />}
            title={converterCorrentezaParaKmh(closestCurrent?.currentSpeed?.sg)}
            subtitle={`Correnteza ${classificarCorrenteza(closestCurrent?.currentSpeed?.sg)}`}
          />
          <InfoCard 
            icon={<Image style={{width: 40, height: 40}} source={{uri: `https://openweathermap.org/img/wn/${weather?.weather?.weather?.[0]?.icon}@4x.png`}}
            />}
            title={`${Math.round(weather?.weather?.main?.temp)}°C`}
            subtitle={`${weather?.weather?.weather?.[0]?.description}`}
          />
        </View>
      </View>
    </View>
  );
}

{
  /* <View>
<Image 
  style={{height: 60, width: 100}}
  source={{uri: `https://openweathermap.org/img/wn/${weather?.weather?.weather?.[0]?.icon}@4x.png`}}
/>
<Text>{weather?.weather?.weather?.[0]?.description}</Text>
</View> */
}
