import React, {useEffect, useRef, useState} from 'react';
import './dropdown.scss';

export type DropdownPropTypes = {
    dropDownTextDiv: React.ReactNode,
    dropDownData: React.ReactNode,
    dropDownDataId: string
};

const Dropdown = (props: DropdownPropTypes) => {
    const {
        dropDownTextDiv,
        dropDownData,
        dropDownDataId
    } = props;

    const ref = useRef<HTMLInputElement>(null);
    const refEl = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [showOptions, setShowOptions] = useState<boolean>(true);
    const [left, setLeft] = useState<undefined | number>(undefined);

    let dropdownContainerTop = undefined ;
    let dropdownContainerLeft = undefined ;
    if (ref  && ref.current) {
        const bg = ref.current.getBoundingClientRect();
        dropdownContainerTop = bg.height + 10;
    }

    if (refEl  && refEl.current && ref  && ref.current) {
        const dropdownEl = refEl.current.querySelector('div.'+dropDownDataId);
        if (dropdownEl) {
            const bg = dropdownEl.getBoundingClientRect();
            const bg1 = ref.current.getBoundingClientRect();
            if (bg.width > 0) {
                dropdownContainerLeft = ( bg.width - bg1.width );
            }
        }
    }

    const handleClickOutside = (event: MouseEvent) => {
        // Check if the click is outside the dropdown component
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowOptions(false);  // Close the dropdown when clicking outside
        }
    };

    useEffect(() => {
        // Add event listener for clicks on the whole document
        document.addEventListener('click', handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (dropdownContainerLeft) {
            setLeft( dropdownContainerLeft * -1 );
        }
    }, [dropdownContainerLeft])

    useEffect(() => {
        const mount = () => {
            setTimeout(() => {
                setShowOptions(false);
            }, 100)
        }
        return mount();
    }, [])

    return (
        <div className={"dropdown-wrapper"} ref={dropdownRef} >
            <div className={"dropdown-opener"} ref={ref} onClick={() => {
                setShowOptions(!showOptions);
            }}>
                {dropDownTextDiv}
            </div>
            <div ref={refEl} className={"dropdown-container h-fit w-fit "+(showOptions ? " show " : "  ")}  style={{
                top: dropdownContainerTop+'px',
                ...(left ? {  left: left+'px' } : {right: '0px'})
            }}>
                {dropDownData}
            </div>

        </div>
    );
}

export default Dropdown;
