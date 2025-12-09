import Card from "../card/Card";
import styles from "./SavedCities.module.css";

const SavedCities = ({ saved, onDelete, user }) => {
    if (!saved.length) return null;

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Saved locations</h2>

            <div className={styles.grid}>
                {saved.map((city, index) => (
                    <Card
                        key={index}
                        cityName={city.name}
                        saved
                        user={user}
                        onDelete={() => onDelete(city.name)}
                    />
                ))}
            </div>
        </section>
    );
};

export default SavedCities;
