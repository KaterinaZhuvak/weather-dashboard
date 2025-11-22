import styles from './Header.module.css';
import logoImg from '../../images/logo.png';
import userImg from '../../images/user.png';
import Button from '../button/Button';
import { useState } from "react";

const Header = () => {
const [open, setOpen] = useState(false);


const openModal = () => setOpen(true);
const closeModal = () => setOpen(false);
    return(
        <header className={styles.header}>
        <div className={styles.container}>
        <div className={styles.wrapper}>
                    <div className={styles.logo}>
                <img  src={logoImg} alt="Logo" />
            </div>
            <ul className={styles.list}>
                <li className={styles.item}>Who we are</li>
                <li className={styles.item}>Contacts</li>
                <li className={styles.item}>Menu</li>
            </ul>
        </div>
            <div className={styles.user}>
                <Button text="Sign Up" onClick={openModal}/>
                <div className={styles.img}>
                    <img src={userImg} alt="user" />
                </div>
            </div>

        </div>
        </header>
    )
}
export default Header;