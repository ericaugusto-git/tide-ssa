import Current from "@/assets/current.svg";
import HighTideSvg from "@/assets/high_tide.svg";
import LowTideSvg from "@/assets/low_tide.svg";
import WindSvg from "@/assets/wind.svg";
import InfoCard from "@/components/InfoCard";
import CustomText from "@/components/CustomText";
import { useTide } from "@/hooks/useTide";
import useWeather from "@/hooks/useWeather";
import {
  classificarCorrenteza,
  converterCorrentezaParaKmh,
  escalaDeBeaufort,
  getClosestTimeEntry,
  padding,
} from "@/utils/utils";
import Octicons from "@expo/vector-icons/Octicons";
import moment from "moment";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { useTime } from "@/hooks/useTime";
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
  const labelMare2: any = {
    low: "Baixa",
    high: "Alta",
  };
  const date = useTime();
  // Find the closest
  useEffect(() => {
    if (tideForecast) {
      setClosestTide(getClosestTimeEntry(tideForecast.data));
      setClosestCurrent(getClosestTimeEntry(currentSpeed.hours));
    }
  }, [tide]);
  return (
    <View
      style={{
        backgroundColor: "#fbfdff",
        height: "100%",
        ...padding(10, 20, 10, 20),
        flexDirection: "column",
        gap: 70,
      }}
    >
      <View style={{ flexDirection: "column", gap: 8 }}>
        <CustomText
          style={{
            fontWeight: "900",
            color: "#b3b5b9",
            fontSize: 10,
            textTransform: "uppercase",
          }}
        >
          {date}
        </CustomText>
        {weather?.name && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 5,
            }}
          >
            <Octicons name="location" size={18} color="black" />
            <CustomText style={{ fontFamily: "Nunito_900Black" }}>
              {weather?.name},
            </CustomText>
            <CustomText
              style={{ fontFamily: "Nunito_900Black", color: "#b3b5b9" }}
            >
              {weather?.sys?.country}
            </CustomText>
          </View>
        )}
      </View>
      <View style={{ flexDirection: "column", alignItems: "center", gap: 60 }}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {closestTide.type === "high" ? (
            <HighTideSvg width={100} height={100} />
          ) : (
            <LowTideSvg width={100} height={100}></LowTideSvg>
          )}
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginTop: -10,
            }}
          >
            <CustomText
              style={{ fontSize: 56, fontWeight: "900" }}
            >{`${closestTide?.height
              ?.toFixed(1)
              .replace(".", ",")} m`}</CustomText>
            <CustomText style={{ fontSize: 16, fontWeight: "700" }}>
              {labelMare[closestTide?.type]}
            </CustomText>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <InfoCard
            icon={<Current style={{ width: "50%", height: "50%" }} />}
            title={converterCorrentezaParaKmh(closestCurrent?.currentSpeed?.sg)}
            subtitle={`Correnteza ${classificarCorrenteza(
              closestCurrent?.currentSpeed?.sg
            )}`}
          />
          <InfoCard
            icon={<WindSvg style={{ width: "60%", height: "60%" }} />}
            title={converterCorrentezaParaKmh(weather?.wind?.speed)}
            subtitle={`${escalaDeBeaufort(weather?.wind?.speed)}`}
          />
          <InfoCard
            icon={
              <Image
                style={{ width: 40, height: 40 }}
                source={{
                  uri: `https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@4x.png`,
                }}
              />
            }
            title={`${Math.round(weather?.main?.temp)}°C`}
            subtitle={`${weather?.weather?.[0]?.description}`}
          />
        </View>
        <View style={{ justifyContent: "flex-start", width: "100%" }}>
          <CustomText style={{ fontWeight: "700", marginBottom: 20 }}>
            Tabuá da maré hoje
          </CustomText>
          <View style={{ flexDirection: "column", gap: 20, width: "100%" }}>
            {tideForecast?.data?.map((tide: any, index: number) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {tide.type === "high" ? (
                    <HighTideSvg width={40} height={40} />
                  ) : (
                    <LowTideSvg width={40} height={40}></LowTideSvg>
                  )}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "88%",
                    }}
                  >
                    <View style={{ flexDirection: "column" }}>
                      <CustomText style={{ fontWeight: "900" }}>{moment(tide.time).format("LT")}</CustomText>
                      <CustomText style={{fontSize: 9}}>Hora</CustomText>
                    </View>
                    <View style={{ flexDirection: "row", gap: 20 }}>
                      <View style={{ flexDirection: "column", width: 60 }}>
                        <CustomText style={{ fontWeight: "900", textAlign: 'left', width: '100%' }}>
                          {`${tide?.height?.toFixed(1).replace(".", ",")} m`}
                        </CustomText>
                        <CustomText style={{fontSize: 9}}>Altura</CustomText>
                      </View>
                      <View style={{ flexDirection: "column", width: 40 }}>
                        <CustomText style={{ fontWeight: "900" }}>
                          {`${labelMare2[tide?.type]}`}
                        </CustomText>
                        <CustomText style={{fontSize: 9}}>Tipo</CustomText>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}

