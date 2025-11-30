
import Button from '../button/Button';
import refreshIcon from '../../images/refresh.svg';
import heart from '../../images/heart.svg'; 
import bin from '../../images/bin.svg';
import styles from './Card.module.css';
import { useEffect, useState } from 'react';
import sun from '../../images/weather/sun.png';

const Card = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dayOfWeek = date.toLocaleString("en-GB", { weekday: "long" });
        const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000); // update every second

        return () => clearInterval(interval); // cleanup on unmount
    }, []);

    const formattedTime = time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        });
    return <div className={styles.card}>
    <div className={styles.location_info}>
        <h5 className={styles.city_name}>Prague</h5>
    <h5 className={styles.country_name}>Czech Republic</h5>
    </div>
        <div className={styles.wrapper}>
            <h3 className={styles.current_time}>{formattedTime}</h3>
            <Button text="Hourly Forecast"/>
        </div>
    <div className={styles.date_info}>
        <span className={styles.date}>{day}.{month}.{year}</span> 
        <span className={styles.line}></span>
        <span className={styles.day}>{dayOfWeek}</span>
        </div>
        <div className={styles.weather_img}>
            <img src={sun} alt="sun" />
        </div>

        <span className={styles.current_temp}>22℃</span>
        <div className={styles.user_functionality}>
            <button className={styles.refresh}>
                <img src={refreshIcon} alt="refresh" />
            </button>
            <button className={styles.like}>
            <img src={heart} alt="like" />
            </button>
            <Button text="See More"/>
            <button className={styles.delete}>
                <img src={bin} alt="delete" />
            </button>
        </div>
    
    </div>
}
export default Card;