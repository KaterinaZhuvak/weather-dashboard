
    import Button from '../button/Button';
    import refreshIcon from '../../images/refresh.svg';
    import heart from '../../images/heart.svg'; 
    import bin from '../../images/bin.svg';
    import styles from './Card.module.css';
    import { useEffect, useState, useCallback } from 'react';
    import WeatherDetailsModal from "../card-details/WeatherDetailsModal";

    const API_KEY = "428cd4749b442fe8cc7d21d894cabf94"; 

    const Card = ({ cityName, onLike, onDelete, user, saved }) => {
        const date = new Date(); 
        const day = date.getDate(); const month = date.getMonth() + 1; 
        const year = date.getFullYear(); 
        const dayOfWeek = date.toLocaleString("en-GB", { weekday: "long" }); 
        const [time, setTime] = useState(new Date()); useEffect(() => { 
            const interval = setInterval(() => { setTime(new Date()); }, 1000); 
            return () => clearInterval(interval);}, []); 
        const formattedTime = time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", });
        const [weather, setWeather] = useState(null);
        const [liked, setLiked] = useState(saved || false);
        const [showDetails, setShowDetails] = useState(false);

        const fetchWeather = useCallback(async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
            );

            if (!response.ok) throw new Error("City not found");

            const data = await response.json();
            console.log(data);
            

            setWeather({
                name: data.name,
                country: data.sys.country,
                temp: Math.round(data.main.temp),
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
                description: data.weather[0].main 
            });

        } catch {
            alert("City not found 🙈");
        }
    }, [cityName]); // зависимость

    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]); // 👈 зависимость теперь корректная

        const toggleLike = () => {
            if (!user) return alert("Log in to save cities 💛");

            setLiked(true);
            onLike(weather);
        };

        if (!weather) return null;
        return <>
        <div className={styles.card}>
            <div className={styles.card_container}> 
            <div className={styles.location_info}> 
            <h5 className={styles.city_name}>{weather.name}</h5> 
            <h5 className={styles.country_name}>{weather.country}</h5> 
            </div> 
        <div className={styles.wrapper}> 
            <h3 className={styles.current_time}>{formattedTime}</h3> 
            <Button text="Hourly Forecast"/> </div> 
            <div className={styles.date_info}> 
                <span className={styles.date}>{day}.{month}.{year}</span> 
                <span className={styles.line}></span> 
                <span className={styles.day}>{dayOfWeek}</span> 
                </div> 
                <div className={styles.weather_img}> 
                    <img src={weather.icon} alt="weather" /> 
                </div>
                    <p className={styles.current_temp}>{weather.temp}℃</p> 
                    <div className={styles.user_functionality}> 
                        
                        <button className={styles.refresh}> 
                        <img src={refreshIcon} alt="refresh" />
                        </button> 
                        <button className={`${styles.like} ${liked ? styles.liked : ""}`} onClick={toggleLike}>
                            <img src={heart} alt="like" />
                        </button>
                            <Button text="See More" onClick={() => setShowDetails(true)} />
                            <button className={styles.delete} onClick={() => onDelete(weather.name)}>
                                <img src={bin} alt="delete" />
                            </button>


                        </div> 
                            </div>
        </div>
        {showDetails && (
    <WeatherDetailsModal 
        cityName={weather.name} 
        onClose={() => setShowDetails(false)} 
    />
)}

        </>

    };
    export default Card;

