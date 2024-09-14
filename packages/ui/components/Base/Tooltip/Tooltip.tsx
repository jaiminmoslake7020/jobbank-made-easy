import React, {useRef} from 'react';
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
    const width = divRef.current?.getBoundingClientRect().width || undefined;
    const height = divRef.current?.getBoundingClientRect().height || undefined;
    return <div ref={divRef} className={`tooltip-wrapper item-${active}`}
                style={ width && height ? {
                    top: (-1 * (height + 20))+"px",
                    left: (-1 * ((width / 2) + 10))+"px",
                } : {
                    left: "-8.5rem",
                    top: "-12rem"
                }}
    >
        <h2 className={" title "}>{title}</h2>
        <p className={" content "}>{content}</p>
        <Arrow />
    </div>
}
