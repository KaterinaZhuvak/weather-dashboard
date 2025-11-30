import styles from "./Modal.module.css"
import Button from "../button/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


const Modal = ({closeModal}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        const data = {
            username,
            email,
            password,
        };

        // onSignUp(data); 
        closeModal(); 
    return <div className={styles.modal}>
        <FontAwesomeIcon onClick={closeModal} className={styles.closeBtn} icon={faXmark} style={{color: "#d9d9d9"}}  />
        <h3 className={styles.modal_title}>Sign Up </h3>
        <div className={styles.modal_container}>
        <label className={styles.label} htmlFor="username">Username</label>
        <input className={styles.input} type="text" name="username" placeholder="Username" value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
        <label className={styles.label} htmlFor="email">Email</label>
        <input className={styles.input} type="email" name="email" placeholder="Email"   value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
        <label className={styles.label} htmlFor="password">Password</label>
        <input className={styles.input} type="password" name="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
/>
</div>
    <Button text="Sign Up" onClick={handleSubmit}/>
        <h6 className={styles.text}>Already have an account? <a href="#">Log in</a></h6>
    </div>
}
}
export default Modal;