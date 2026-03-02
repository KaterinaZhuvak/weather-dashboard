import styles from "./WeatherDetailsModal.module.css";
import { useEffect, useState } from "react";
import temp from '../../images/weather/temp.png'
import humidity from '../../images/weather/humidity.png'
import pressure from '../../images/weather/pressure.png'
import wind from '../../images/weather/wind.png'
import eye from '../../images/weather/eye.png'
import Button from "../button/Button";
const api_key = process.env.REACT_APP_HOURLY_API_KEY;
const WeatherDetailsModal = ({ onClose, cityName }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!cityName) return;

        const fetchWeatherDetails = async () => {
            try {
            
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`
                );

                if (!response.ok) throw new Error("City not found");

                const data = await response.json();
                setWeather({
                    name: data.name,
                    country: data.sys.country,
                    feels: data.main.feels_like,
                    min: data.main.temp_min,
                    max: data.main.temp_max,
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                    wind: data.wind.speed,
                    visibility: data.visibility,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherDetails();
    }, [cityName]);

    if (!weather) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.info}>
                    <p className={styles.info_title}>Feels like </p>
                    <p className ={styles.info_data}>{weather.feels}°C</p>
                    <div className={styles.info_img}>
                        <img src={temp} alt="temp" />
                    </div>
                </div>
                <div className={styles.info}>
                    <p className={styles.info_title}>Min </p>
                    <p className ={styles.info_data}>{weather.min}°C</p>
                    <p className={styles.info_title}>Max</p>
                    <p className ={styles.info_data}>{weather.max}°C</p>
                </div>
                <div className={styles.info}>
                    <p className={styles.info_title}>Humidity </p>
                    <p className ={styles.info_data}>{weather.humidity}%</p>
                    <div className={styles.info_img}>
                        <img src={humidity} alt="temp" />
                    </div>
                    </div>
                <div className={styles.info}>
                    <p className={styles.info_title}>Pressure</p>
                    <p className ={styles.info_data}>{weather.pressure} hPa</p>
                    <div className={styles.info_img}>
                        <img src={pressure} alt="temp" />
                    </div>
                </div>
                <div className={styles.info}>
                    <p className={styles.info_title}>Wind</p>
                    <p className ={styles.info_data}> {weather.wind} m/s</p>
                        <div className={styles.info_img}>
                        <img src={wind} alt="temp" />
                    </div>
                    </div>
                <div className={styles.info}>
                    <p className={styles.info_title}>Visibility</p>
                    <p className ={styles.info_data}>{weather.visibility} m</p>
                    <div className={styles.info_img}>
                        <img src={eye} alt="temp" />
                    </div>
                </div>
                <Button text="Close" onClick={onClose} />
            </div>
        </div>
    );
};

export default WeatherDetailsModal;
