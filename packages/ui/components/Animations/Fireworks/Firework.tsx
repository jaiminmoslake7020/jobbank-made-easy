import React from 'react';
import {Explosion} from './Explosion';

export type FireworkPropTypes = {
    x: number,
    y: number,
    scale: number,
    i: number
};

export const Firework = (props: FireworkPropTypes) => {
    const columns = new Array(18).fill("null");
    const {
        x, y, scale, i
    } = props;
    const transform = `translate(${x}px, ${y}px) scale(${scale})`;
    const className = `firework-style-${i}`;
    return  <div className={`firework ${className} `} style={{
        transform: transform
    }}>
        {columns.map((x, i) => <Explosion key={"Explosion-"+i} />)}
    </div>;
};
