import styles from "./Hero.module.css";
import searchImg from "../images/search.svg";
const Hero = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "long" });
    const dayOfWeek = date.toLocaleString("en-GB", { weekday: "long" });
    const year = date.getFullYear();
    return <section className={styles.hero}>
        <div className={styles.container}>
        <div className={styles.wrapper}>  
            <h1 className={styles.title}>Weather dashboard</h1>
            <div className={styles.cover}>
                <h2 className={styles.text}>Create your personal list of <br /> favorite cities and always be <br /> aware of the weather.</h2>
                <div className={styles.line}></div>  
                <h2 className={styles.date}>{month} {year} <br /> {dayOfWeek}, {day}</h2>  
            </div>
            <div className={styles.input_wrapper}>
                <input className={styles.input} type="text" placeholder="Search location..." />
                <button className={styles.input_btn}>
                    <img src={searchImg} alt="search" /> 
                    {/* comment  */}
                </button>
            </div>
        </div> 
        </div>
    </section>;
}
export default Hero;