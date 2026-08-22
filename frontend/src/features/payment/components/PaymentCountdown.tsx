import React, { useState, useEffect } from 'react';

interface Props { expiredAt: string; onExpire: () => void; }

const PaymentCountdown = ({ expiredAt, onExpire }: Props) => {
    const [timeLeft, setTimeLeft] = useState<number>(0);

    useEffect(() => {
        const calculate = () => {
            const diff = Math.floor((new Date(expiredAt).getTime() - Date.now()) / 1000);
            if (diff <= 0) {
                //Clear interval immediately when time is up
                setTimeLeft(0);
                onExpire();
                return true; // Signal to stop
            }
            setTimeLeft(diff);
            return false;
        };

        const timer = setInterval(() => {
            const isDone = calculate();
            if (isDone) clearInterval(timer);
        }, 1000);

        calculate();
        return () => clearInterval(timer);
    }, [expiredAt, onExpire]);

    const format = (s: number) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="text-lg font-mono font-bold text-red-600 bg-red-50 px-4 py-2 rounded-full border border-red-200 shadow-sm">
            Expires in: {format(timeLeft)}
        </div>
    );
};

export default PaymentCountdown;