import React, {
    ChangeEvent,
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState
} from 'react';
import './autocomplete.scss';

export type AutoCompleteItemProp = {
    label: string,
    value: string
};

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    contentEditable?: 'inherit' | boolean
}


export type AutoCompleteProps = {
    inputProps : any | CustomInputProps,
    data: AutoCompleteItemProp[],
    wrapperIdClass?: string,
    dropDownWrapperClass?: string,
    dropDownBtnClass?: string
};

export const AutoComplete = (props: AutoCompleteProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const {
        inputProps,
        data,
        wrapperIdClass,
        dropDownWrapperClass,
        dropDownBtnClass
    } = props

    const {
        onChange
    } = inputProps || {} ;

    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [autoCompleteData, setAutoCompleteData] = useState<AutoCompleteItemProp[]>(data);

    const handleFocus = ()  => {
        setShowOptions(true);
    }

    const handleClickOutside = (event: MouseEvent) => {
        // Check if the click is outside the dropdown component
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowOptions(false);  // Close the dropdown when clicking outside
        }
    };

    const handleDataFilteration = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '') {
            setAutoCompleteData(data);
        } else {
            setAutoCompleteData(data.filter(({label}) => label.toLowerCase().indexOf(value.toLowerCase()) === 0 || (value.length >= 3 && label.toLowerCase().indexOf(value.toLowerCase()) !== -1)))
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

    let height = undefined ;
    let maxAllowedHeight = undefined ;
    if (ref  && ref.current) {
        const bg = ref.current.getBoundingClientRect();
        height = bg.height + 10;
        const windownInnerHeight = window.innerHeight;
        maxAllowedHeight = windownInnerHeight - ( bg.y + bg.height + 50 );
        let maxAllowedHeightWithData = ( autoCompleteData.length * 40 ) + 32;
        if (maxAllowedHeightWithData < maxAllowedHeight) {
            maxAllowedHeight = maxAllowedHeightWithData;
        }
    }

    return onChange ? <div className={` auto-complete-wrapper ${wrapperIdClass || ''} `} ref={dropdownRef}>
        <input {...inputProps} onChange={(e) => {
            handleDataFilteration(e);
            onChange(e);
        }} ref={ref} onFocus={handleFocus} onFocusCapture={handleFocus} autoComplete="off" />
        {
            height && showOptions && autoCompleteData.length > 0 ?
                <div className={` auto-complete-container ${dropDownWrapperClass || ''} `} style={{
                    top: height+'px',
                    height: maxAllowedHeight+'px',
                    maxHeight: maxAllowedHeight+'px',
                }}>
                        {
                            autoCompleteData.map((item) => <button
                                key={item.label}
                                type={"button"}
                                className={`auto-complete-item-btn ${dropDownBtnClass || ''} `}
                                onClick={(e) => {
                                    const e1 = {
                                        target: {
                                            name: inputProps.name,
                                            value: item.value
                                        }
                                    };
                                    onChange(e1 as any);
                                    setShowOptions(false);
                                }}
                            >{item.label}</button>)
                        }
                </div> : null
        }
    </div> : <></>
}

