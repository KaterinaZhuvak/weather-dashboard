import { useEffect, useState } from "react";
import styles from "./News.module.css";
import Button from "../button/Button";

const NEWS_API_KEY = "d399044f24a44effb8d1245fdeb0ec85";

const News =()=> {
const [articles, setArticles] = useState([]);
const [visible, setVisible] = useState(4);

useEffect(() => {
    fetch(
    `https://newsapi.org/v2/everything?q=dogs&language=en&pageSize=20&apiKey=${NEWS_API_KEY}`
    )
    .then(res => res.json())
    .then(data => setArticles(data.articles || []));
}, []);

    return (
        <div className={styles.news_section}>
               <div className={styles.news_wrapper}>
    <h2 className={styles.news_title}>Interacting with our pets</h2>

    <div className={styles.news_container}>
        {articles.slice(0, visible).map((a, i) => (
        <div
            key={i}
        >
            <div className={styles.news_img}>
            <img src={a.urlToImage} alt="news" />
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