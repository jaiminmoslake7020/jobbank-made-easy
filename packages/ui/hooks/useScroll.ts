import { useEffect, useState } from 'react';

export const useScrollY = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrollY;
};

export const useScrollX = () => {
    const [scrollX, setScrollX] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollX(window.scrollX);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrollX;
};


export const useScroll = () => {
    const [scrollX, setScrollX] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollX(window.scrollX);
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return {
        scrollX,
        scrollY
    };
};
