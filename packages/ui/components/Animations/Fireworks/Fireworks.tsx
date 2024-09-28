import React, {useEffect, useState} from 'react';
import './fireworks.scss';
import {useWindowSize} from '../../../hooks';
import {getTailwindColorsFullArray} from '../../../data/tailwindColors';
import {Firework, FireworkPropTypes} from './Firework';
import {getRandomInt2, getRandomViewport} from '../../../utils/number';

export type FireworksPropTypes = {
    numberOfExplosions?: number,
    zIndex?: number,
    onClick?: Function
};

const cList = getTailwindColorsFullArray();
export const Fireworks = (props: FireworksPropTypes) => {
    const {
        numberOfExplosions, zIndex, onClick
    } = props;
    const numberOfExplosionsInner = numberOfExplosions || 20;
    const zIndexInner = zIndex || 20;
    const { width, height } = useWindowSize();

    const [fireworks, setFireworks] = useState<FireworkPropTypes[]>([]);

    useEffect(() => {
        if (width && height) {
            const array = new Array(numberOfExplosionsInner).fill(null);
            // Create a new <style> element
            const style = document.createElement('style');
            let styleTextContent = '';
            setFireworks(
            array.map((x, i) =>  {
                const s = Math.random();
                const scale = getRandomInt2(70, 250);
                const colorId = getRandomInt2(0, cList.length - 1);
                // Add CSS content to target the ::before pseudo-element
                styleTextContent += `
                        .firework.firework-style-${i} .explosion:before{
                             background-color: ${cList[colorId].hexColor};
                             animation-delay: ${s}s;
                        }
                `;
                return ({...getRandomViewport(width, height), scale: scale/100, i});
            }));
            style.textContent = styleTextContent;
            // Append the <style> element to the <head> of the document
            document.head.appendChild(style);
        }
    }, [width, height, numberOfExplosionsInner])

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
