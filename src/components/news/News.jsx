import { useEffect, useState } from "react";
import styles from "./News.module.css";
import Button from "../button/Button";

const newApiKey = process.env.REACT_APP_NEWS_API_KEY;
console.log(process.env.REACT_APP_NEWS_API_KEY);


const News =()=> {
const [articles, setArticles] = useState([]);
const [visible, setVisible] = useState(4);  

useEffect(() => {
    fetch(
    `https://newsapi.org/v2/everything?q=dogs&language=en&pageSize=20&apiKey=${newApiKey}`
    )
    .then(res => res.json())
    .then(data => setArticles(data.articles || []));
}, []);

    return (
        <div className={styles.news_section} id="menu">
            <div className={styles.news_wrapper}>
    <h2 className={styles.news_title}>Interacting with our pets</h2>

    <div className={styles.news_container}>
        {articles.slice(0, visible).map((a, i) => (
        <div
            key={i}
        >
            <div className={styles.news_img}>
            <img src={a.urlToImage || "https://t4.ftcdn.net/jpg/17/11/97/91/360_F_1711979176_Y5lQ77z0P7pJ9Tp14INFrJad57l3jLph.jpg"} alt="news" />
            </div>
            <h4 className={styles.news_content}>{a.title}</h4>
            
        </div>
        ))}
    </div>

    {visible < articles.length && (
  <div className={styles.news_button}>
        <Button text="See More" onClick={() => setVisible(prev => prev + 4)}/>
  </div>
    )}
    </div>
        </div>
);
}
export default News;