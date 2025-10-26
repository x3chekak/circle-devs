import { useState, useEffect } from 'react';

type CountdownTimerReturn = {
    secondsLeft: number;
    isActive: boolean;
};

export const useCountdownTimer = (initialSeconds: number): CountdownTimerReturn => {

    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        let intervalId: number | undefined;

        if (isActive && secondsLeft > 0) {
            intervalId = setInterval(() => {
                setSecondsLeft((prev) => prev - 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isActive, secondsLeft]);

    useEffect(() => {
        if (!isActive) {
            setSecondsLeft(initialSeconds);
        }
    }, [isActive, initialSeconds]);

    useEffect(() => {
        if (secondsLeft === 0) {
            setIsActive(false);
        }
    }, [secondsLeft]);

    return { secondsLeft, isActive };
};