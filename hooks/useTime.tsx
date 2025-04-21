import moment from "moment";
import { useEffect, useState } from "react";

export function useTime(){
    const [time, setTime] = useState(moment().format("LLLL"));
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(moment().format("LLLL"))
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return time;
}