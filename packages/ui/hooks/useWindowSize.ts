import {useEffect, useState} from 'react';

export type WindowSizeType = {
    width: number | undefined,
    height: number | undefined
};

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<WindowSizeType>({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                // Code is running on the client
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            };

            // Initial call to set the window width on component mount
            handleResize();

            // Add event listener for window resize
            window.addEventListener('resize', handleResize);

            // Cleanup the event listener on component unmount
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    const {
        width, height
    } = windowSize;
    return { width, height };
}
