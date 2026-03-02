import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Button from "../button/Button";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Filler,
} from "chart.js";
import styles from "./HourlyModal.module.css";

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Filler
);

const api_key = process.env.REACT_APP_HOURLY_API_KEY;

const HourlyForecastModal = ({ cityName, onClose }) => {
    const [hours, setHours] = useState([]);
    const [temps, setTemps] = useState([]);

    useEffect(() => {
        const fetchHourly = async () => {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${api_key}`
            );

            const data = await response.json();

            const hourly = data.list.slice(0, 8); // 8 найближчих годин

            setHours(hourly.map(item =>
                new Date(item.dt * 1000).getHours() + ":00"
            ));

            setTemps(hourly.map(item => item.main.temp));
        };

        fetchHourly();
    }, [cityName]);

    const chartData = {
        labels: hours,
        datasets: [
            {
                label: "Temperature (°C)",
                data: temps,
                fill: false,
                borderColor: "orange",
                tension: 0.4,
                pointRadius: 0,
                borderWidth: 3,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                ticks: { borderColor: "#b5b5b5", borderWidth: "1px"  },
                grid: { color: "#ddd" },
            },
            x: {
                ticks: { color: "#777" },
                grid: { display: false },
            },
        },
        plugins: {
            legend: { display: false },
        },
    };

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>Hourly Forecast</h2>

                <Line className={styles.info} data={chartData} options={chartOptions} />
              <div className={styles.button}>
                  <Button text="Close" onClick={onClose} />
              </div>
            </div>
        </div>
    );
};

export default HourlyForecastModal;
