import styles from './Header.module.css';
import logoImg from '../../images/logo.png';
import userImg from '../../images/user.png';
import arrow from '../../images/arrow.svg';
import Button from '../button/Button';
import { useState } from "react";

const Header = ({ openModal, user, onSignOut }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <header className={styles.header}>
            <div className={styles.container}>
                
                <div className={styles.logo}>
                    <img src={logoImg} alt="Logo" />
                </div>

                <button 
                  className={`${styles.menuToggle} ${menuOpen ? styles.rotated : ""}`}
                  onClick={() => setMenuOpen(prev => !prev)}
                >
                    <img src={arrow} alt="arrow" />
                </button>

                <div className={`${styles.wrapper} ${menuOpen ? styles.open : ""}`}>
                    <ul className={styles.list}>
                        <li className={styles.item}>Who we are</li>
                        <li className={styles.item}><a href="#contacts">Contacts</a></li>
                        <li className={styles.item}><a href="#menu">Menu</a></li>
                    </ul>

                    <div className={styles.user}>
                        {user ? (
                            <>
                                <span className={styles.username}>{user.username}</span>
                                <Button text="Sign Out" onClick={onSignOut} />
                                <div className={styles.user_img}>
                                    <img src={userImg} alt="user" />
                                </div>
                            </>
                        ) : (  <>
                                <Button text="Sign Up" onClick={openModal} />
                                <div className={styles.user_img}>
                                    <img src={userImg} alt="user" />
                                </div> 
                                </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
