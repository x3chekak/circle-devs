import useCountdownTimer from './useCountdownTimer';

const Modal = ({ initialTime, onClose }) => {
    const { secondsLeft, isActive } = useCountdownTimer(initialTime);

    return (
        <div className="modal">
            <p>Вы уверены, что хотите удалить элемент?</p>
            <p>Окно автоматически закроется через {secondsLeft} секунды.</p>
            <button type="button" onClick={onClose}>
                Отмена
            </button>
        </div>
    );
};

export default Modal;