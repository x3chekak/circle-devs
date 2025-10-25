import { useState, useEffect } from 'react';

// Custom Hook for countdown timer logic
const useCountdownTimer = (initialSeconds) => {
    // State to track remaining time and whether the timer is active
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(true); // Flag to indicate if timer is running

    // Effect to handle timer updates every second
    useEffect(() => {
        let intervalId;

        if (isActive && secondsLeft > 0) {
            intervalId = setInterval(() => {
                setSecondsLeft((prevSecs) => prevSecs - 1);
            }, 1000);
        }

        // Clear interval when component unmounts or timer finishes
        return () => clearInterval(intervalId);
    }, [isActive, secondsLeft]);

    // Reset timer state when the modal closes manually
    useEffect(() => {
        if (!isActive) {
            setSecondsLeft(initialSeconds);
        }
    }, [isActive, initialSeconds]);

    // Automatically close the modal when timer reaches zero
    useEffect(() => {
        if (secondsLeft === 0) {
            setIsActive(false);
        }
    }, [secondsLeft]);

    return { secondsLeft, isActive };
};

export default useCountdownTimer;