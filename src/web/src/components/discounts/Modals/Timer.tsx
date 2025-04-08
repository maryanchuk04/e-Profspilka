'use client';
import { useEffect, useState } from 'react';

interface TimerProps {
    finishHandler?: () => void;
    isTimerStarted: boolean;
    setIsTimerStarted: (value: boolean) => void;
    durationSeconds?: number;
}

const Timer = ({ finishHandler = () => {}, isTimerStarted, setIsTimerStarted, durationSeconds = 60 }: TimerProps) => {
    const [seconds, setSeconds] = useState(durationSeconds);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isTimerStarted) {
            setSeconds(durationSeconds);
            intervalId = setInterval(() => {
                setSeconds((prev) => {
                    if (prev > 1) {
                        return prev - 1;
                    } else {
                        clearInterval(intervalId);
                        setIsTimerStarted(false);
                        finishHandler();
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isTimerStarted]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, '0');
        const secs = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    };

    const lineColor = isTimerStarted ? 'bg-blue-600' : 'bg-gray-500';
    const lineWidth = (seconds / durationSeconds) * 100;

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='relative w-64 h-4 bg-gray-300 rounded overflow-hidden mb-2'>
                <div
                    className={`absolute top-0 left-0 h-full transition-all duration-500 ease-linear ${lineColor}`}
                    style={{ width: `${lineWidth}%` }}
                />
            </div>
            <div className='text-xl font-bold text-center'>{formatTime(seconds)}</div>
        </div>
    );
};

export default Timer;
