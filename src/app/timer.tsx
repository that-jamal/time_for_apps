'use client'
import { useState, useEffect } from 'react';
type CounterProps = {
    initialTime: number,
    id: number,
    project: string,
    update: (id: number, time: number, project: string) => Promise<"Updated" | "wrong">
}

export default function Counter({ initialTime, update, id, project }: CounterProps) {


    const [time, setTime] = useState({
        hours: Math.floor(initialTime / 3600),
        minutes: Math.floor((initialTime % 3600) / 60),
        seconds: initialTime % 60
    });
    const [isRunning, setIsRunning] = useState(false);
    const [remainingSeconds, setRemainingSeconds] = useState(initialTime);


    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => {
                setTime(prevTime => {
                    let seconds = prevTime.seconds + 1,
                        minutes = prevTime.minutes,
                        hours = prevTime.hours;
                    if (seconds === 60) {
                        seconds = 0;
                        minutes++;
                    }
                    if (minutes === 60) {
                        minutes = 0;
                        hours++;
                    }
                    return { hours, minutes, seconds };
                });
                setRemainingSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    const toggleTimer = () => {
        setIsRunning(prevState => !prevState);

        update(id, remainingSeconds, project)
    }
    const handleRestart = () => {
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        setIsRunning(false);
        setRemainingSeconds(0); // Reset remaining seconds when restarted
        update(id, remainingSeconds, project)
    };

    return (
        <div className="flex items-center flex-col justify-between">
            <p className=" w-28 bg-indigo-400 text-center text-xl text-indigo-950 rounded-full px-1 py-1 transition-colors duration-300 ease-in-out">{time.hours.toString().padStart(2, '0')}:{time.minutes.toString().padStart(2, '0')}:{time.seconds.toString().padStart(2, '0')}</p><div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={handleRestart}>Restart</button>
            </div>
        </div>
    );

}
