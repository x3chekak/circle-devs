import styles from './WelcomePage.module.scss'
import React from 'react';
import { Link } from 'react-router-dom';


const WelcomePage: React.FC = () => {
    return (
        <div className={styles.welcome}>
            <h1>Добро пожаловать!</h1>
            <h2>Это приложение для планирования задач</h2>
            <h4>Создавайте категории, добавляйте задачи,
                <br></br> меняйте при помощи двойного щелчка по тексту
                <br></br> и удаляйте их по мере необходимости.
                <br></br>Организуйте свои дела легко и быстро!
            </h4>
            <Link to="/data" className={styles.styled_link_btn}>К приложению</Link>
        </div>
    );
};

export default WelcomePage;

