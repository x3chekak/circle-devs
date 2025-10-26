import styles from './Header.module.scss'
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
    return (
        <header className={styles.header }>
            <nav>
                <Link to="/" className={styles.styled_link_btn}>К описанию</Link>
            </nav>
        </header>
    );
}