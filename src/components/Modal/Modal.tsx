import styles from './Modal.module.scss'
import { useEffect } from 'react';
import { useCountdownTimer } from './useCountDownTimer';

interface ModalProps {
    initialTime: number;
    onConfirm(): void; 
    onCancel(): void;
}

export const Modal: React.FC<ModalProps> = ({ initialTime, onConfirm, onCancel }) => {

    const { secondsLeft } = useCountdownTimer(initialTime);

    useEffect(() => {
        if (secondsLeft === 0) {
            onConfirm();
        }
    }, [secondsLeft, onConfirm]);

    return (
        <div className={styles.modal}>
            <p>Элемент удалиться автоматически через {secondsLeft} сек.</p>
            <button onClick={onConfirm}>Удалить</button>
            <button onClick={onCancel}>Отменить</button>
        </div>
    );
};

