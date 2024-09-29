import React, {useEffect, useState} from 'react';
import './fireworks.scss';
import {useWindowSize} from '../../../hooks';
import {getTailwindColorsFullArray} from '../../../data/tailwindColors';
import {Firework, FireworkPropTypes} from './Firework';
import {getRandomInt2, getRandomViewport} from '../../../utils/number';

export type FireworksPropTypes = {
    numberOfExplosions?: number,
    zIndex?: number,
    onClick?: Function,
    animationIterationCount?: number | 'infinite'
};

const cList = getTailwindColorsFullArray();

const getFireworksConfigAndStyle = (numberOfExplosionsInner: number, animationIterationCountInner: number | 'infinite', width: number, height: number) => {
    let styleTextContent = '';
    let newArray = [] as FireworkPropTypes[];
    new Array(numberOfExplosionsInner).fill(null).forEach((x, i) =>  {
        const s = Math.random();
        const scale = getRandomInt2(70, 250);
        const colorId = getRandomInt2(0, cList.length - 1);
        // Add CSS content to target the ::before pseudo-element
        styleTextContent += `
                        .firework.firework-style-${i} .explosion:before{
                             background-color: ${cList[colorId].hexColor};
                             animation-delay: ${s}s;
                             animation-iteration-count: ${animationIterationCountInner};
                        }
                `;
        newArray.push({...getRandomViewport(width, height), scale: scale/100, i} as FireworkPropTypes );
    })
    return {
        fireworkPropsArray:  newArray,
        styleTextContent
    };
}

export const Fireworks = (props: FireworksPropTypes) => {
    const {
        numberOfExplosions, zIndex, onClick,
        animationIterationCount
    } = props;
    const animationIterationCountInner = animationIterationCount || 1;
    const numberOfExplosionsInner = numberOfExplosions || 20;
    const zIndexInner = zIndex || 20;
    const { width, height } = useWindowSize();

    const [fireworks, setFireworks] = useState<FireworkPropTypes[]>([]);

    useEffect(() => {
        const mount = () => {
            if (width && height) {
                // Create a new <style> element
                const style = document.createElement('style');
                style.className = 'fireworks-style';
                const { fireworkPropsArray, styleTextContent } = getFireworksConfigAndStyle(numberOfExplosionsInner, animationIterationCountInner, width, height);
                setFireworks(fireworkPropsArray);
                style.textContent = styleTextContent;
                // Append the <style> element to the <head> of the document
                document.head.appendChild(style);
            }
        }
        mount();
        return () => {
           document.querySelectorAll('style.fireworks-style').forEach((item) => item.remove());
        }
    }, [width, height, numberOfExplosionsInner, animationIterationCountInner])

    return (
        fireworks.length > 0 ?
        <div className={"fireworks-wrapper"} style={{
            zIndex: zIndexInner
        }}
        onClick={() => {
            if (onClick) {
                onClick();
            }
        }}
        >
            {fireworks.map((f, i) => <Firework key={"firework-"+i} {...f} />)}
        </div> : null
    );
}
