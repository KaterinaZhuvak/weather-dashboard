import { useEffect, useState } from "react";
import styles from "./Pictures.module.css";
const PIXABAY_KEY = "47549989-617b04660ae302c9307f38156";

const Pictures =()=> {
const [photos, setPhotos] = useState([]);
const [index, setIndex] = useState(0);

useEffect(() => {
    fetch(
    `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=nature&image_type=photo&per_page=20`
    )
    .then(res => res.json())
    .then(data => setPhotos(data.hits || []));
}, []);

const next = () => {
    setIndex(prev => (prev + 1) % photos.length);
};

const prev = () => {
    setIndex(prev => (prev - 1 + photos.length) % photos.length);
};

return (
    <div className={styles.pictures_section}> 
    <div className={styles.container}>
        <h4 className={styles.title}>Beautiful nature</h4>

    <div className={styles.slider_container}
    >
        {photos.length > 0 && (
        <img className={styles.slider_image}
            src={photos[index].largeImageURL}
            alt="nature"
          />
        )}

        {/* Prev button */}
        <button
        onClick={prev}
         style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "#fff",
            borderRadius: "50%",
            padding: "8px",
            cursor: "pointer",
            border: "none",
            fontSize: "18px",
        }}
        >
        
        </button>

        {/* Next button */}
        <button
        onClick={next}
        style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "#fff",
            borderRadius: "50%",
            padding: "8px",
            cursor: "pointer",
            border: "none",
            fontSize: "18px",
        }}
        >
        
        </button>
    </div>
    </div>
    </div>
);
}
export default Pictures;