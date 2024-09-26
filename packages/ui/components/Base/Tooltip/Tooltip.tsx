import React, {useEffect, useRef, useState} from 'react';
import './tooltip.scss';

export type TooltipType = {
    title: string,
    content: string
};

export const Arrow = () => {
    return   <div className={"arrow-wrapper"}>
        <div className={" arrow-container "}>
            <div className={"arrow-div-one"}></div>
            <div className={"arrow-div-two"}></div>
        </div>
    </div>
}


export const Tooltip = (props : {
    tooltip: TooltipType,
    active: boolean
}) => {
    const {tooltip, active} = props;
    const { title, content } = tooltip;

    const divRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<undefined | number>(undefined);
    const [height, setHeight] = useState<undefined | number>(undefined);
    const [visible, setVisible] = useState<boolean>(true);
    const [itemCalculationVisibilityClass, setItemCalculationVisibilityClass] = useState<string>('item-first-visible');

    useEffect(() => {
        setTimeout(() => {
            const widthIn = divRef.current?.getBoundingClientRect().width || undefined;
            const heightIn = divRef.current?.getBoundingClientRect().height || undefined;
            if (widthIn) {
                setWidth(widthIn);
            }
            if (heightIn) {
                setHeight(heightIn);
            }
            if (widthIn || heightIn) {
                setItemCalculationVisibilityClass('');
            }
        }, 10);
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setVisible(active);
        }, 100);
    }, [active]);

    return <div ref={divRef} className={`tooltip-wrapper ${itemCalculationVisibilityClass} item-${visible}`}
                style={ width && height ? {
                    top: (-1 * (height + 20))+"px",
                    left: (-1 * ((width / 2) + 10))+"px",
                } : {
                    top: 0,
                    left: 0
                }}
    >
        <h2 className={" title "}>{title}</h2>
        <p className={" content "}>{content}</p>
        <Arrow />
    </div>
}
