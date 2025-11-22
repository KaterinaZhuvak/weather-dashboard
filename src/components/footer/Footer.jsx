import styles from "./Footer.module.css"
import logoImg from "../../images/logo.png"
import instagramImg from "../../images/instagram.svg"
import facebookImg from "../../images/facebook.svg"
import whatsappImg from "../../images/whatsapp.svg"

const Footer = () => {
    return <footer className={styles.footer}>
        <div className={styles.container}>
            <div className="footer__image">
                <img className="footer__image-img" src={logoImg} alt="Logo" />
            </div>
            <div className={styles.text}>
                <p className={styles.textTitle}>Address</p>
                <p className="footer__text-address">Svobody str. 35 <br /> Kyiv <br /> Ukraine</p>
            </div>
            <div className="footer__contacts">
                <h5 className={styles.contact_title}>Contact Us</h5>
                <ul className={styles.list}>
                    <li className="footer__contact-item">
                        <img className="footer__contact-img" src={instagramImg} alt="instagram" />
                    </li>
                    <li className="footer__contact-item">
                        <img className="footer__contact-img" src={facebookImg} alt="facebook" />
                    </li>
                    <li className="footer__contact-item">
                        <img className="footer__contact-img" src={whatsappImg} alt="whatsapp" />
                    </li>
                </ul>
            </div>
        </div>
    </footer>
}
export default Footer