// import { useEffect, useState } from "react";
// import styles from "./WeeklyModal.module.css";

// const API_KEY = "428cd4749b442fe8cc7d21d894cabf94";

// const WeeklyModal = ({ cityName, onClose }) => {
// const [forecast, setForecast] = useState([]);

// useEffect(() => {
//     const fetchWeekly = async () => {
//     try {
//         // 1. Получаем координаты города
//         const resCity = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
//         );
//         const cityData = await resCity.json();

    

//         // 2. Получаем прогноз на 7 дней
// const resWeekly = await fetch(
//     `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
// );  
//     const weeklyData = await resWeekly.json();
//     const daily = weeklyData.list.filter((_, index) => index % 8 === 0);

// setForecast(daily.slice(0, 7));
// if (!cityData.coord) {
//     throw new Error("No coordinates found");
// }
//     const { lat, lon } = cityData.coord;

//         setForecast(weeklyData.daily.slice(0, 7));
//         } catch (err) {
//         alert("Failed to load weekly data");
//         }
//     };

//     fetchWeekly();
//     }, [cityName]);

//     const formatDate = (dt) => {
//     return new Date(dt * 1000).toLocaleDateString("en-US", {
//         weekday: "short",
//         month: "short",
//         day: "numeric",
//     });
//     };

//     return (
//     <div className={styles.modalOverlay}>
//         <div className={styles.modal}>
//         <h3 className={styles.title}>Weekly forecast</h3>

//         <button className={styles.closeBtn} onClick={onClose}>✕</button>

//         <div className={styles.list}>
//             {forecast.map((day, index) => (
//             <div key={index} className={styles.item}>
//                 <span className={styles.date}>{formatDate(day.dt)}</span>

//                 <img
//                 className={styles.icon}
//                 src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
//                 alt="weather"
//                 />

//                 <span className={styles.temp}>
//                 {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
//                 </span>

//                 <span className={styles.desc}>{day.weather[0].description}</span>
//             </div>
//             ))}
//         </div>
//         </div>
//     </div>
//         );
// };

// export default WeeklyModal;

import { useEffect, useState } from "react";
import styles from "./WeeklyModal.module.css";

const api_key = process.env.REACT_APP_WEEKLY_API_KEY

const WeeklyModal = ({ cityName, onClose }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchWeekly = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${api_key}`
        );

        if (!res.ok) throw new Error("Forecast error");

        const data = await res.json();

        // берём 1 прогноз в день (каждые 24 часа)
        const daily = data.list.filter((_, index) => index % 7 === 0);

        setForecast(daily.slice(0, 5));
      } catch (err) {
        console.error(err);
        alert("Weekly forecast unavailable");
      }
    };

    fetchWeekly();
  }, [cityName]);

  const formatDate = (dt) =>
    new Date(dt * 1000).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>5-day forecast</h3>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <div className={styles.list}>
          {forecast.map((day, index) => (
            <div key={index} className={styles.item}>
              <span>{formatDate(day.dt)}</span>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt=""
              />
              <span>
                {Math.round(day.main.temp_max)}° / {Math.round(day.main.temp_min)}°
              </span>
              <span>{day.weather[0].description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyModal;
