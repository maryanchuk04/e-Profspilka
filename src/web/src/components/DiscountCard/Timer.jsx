import React, { useState, useEffect } from 'react';

const Timer = ({ finishHandler = null, isTimerStarted, setIsTimerStarted }) => {
    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
        let intervalId;

        if (isTimerStarted) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds > 0) {
                        return prevSeconds - 1;
                    } else {
                        finishHandler && finishHandler();
                        clearInterval(intervalId);
                        setIsTimerStarted(false);
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isTimerStarted]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const lineColor = isTimerStarted ? 'bg-blue-600' : 'bg-gray-500';
    const lineWidth = (seconds / 60) * 100;

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='relative w-64 h-4 bg-gray-300 rounded overflow-hidden'>
                <div
                    className={`absolute top-0 left-0 h-full transition-width duration-1000 ${lineColor}`}
                    style={{ width: `${lineWidth}%` }}
                ></div>
            </div>
            <div className='mb-4'>
                <div className='text-xl font-bold text-center'>{formatTime(seconds)}</div>
            </div>
        </div>
    );
};

export default Timer;
