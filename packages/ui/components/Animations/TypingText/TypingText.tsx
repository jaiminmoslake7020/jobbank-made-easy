import React, {useEffect, useState} from 'react';
import './typing-text.scss';

export type TypingTextPropTypes = {
    text: string,
    duration: number
};

export const TypingText = (props: TypingTextPropTypes) => {
    const {
        text,
        duration
    } = props;

    const maxCharLength = text.length;
    const addCharDuration = duration;

    const [start, setStart] = useState<number>(0);

    useEffect(() => {
        const mount = () => {
            let timer = 0;
            const i = setInterval(() => {
                setStart((x) => x + 1);
                if (timer === maxCharLength) {
                    clearInterval(i);
                }
                timer++;
            }, addCharDuration);
        }
        return mount();
    }, [addCharDuration, maxCharLength])

    return (
        <>
            {text.slice(0, start)}
            <span className={"typing-text-cursor"} >|</span>
        </>
    );
}
