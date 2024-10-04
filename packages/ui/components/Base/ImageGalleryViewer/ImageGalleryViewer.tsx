import React, {SetStateAction, useCallback, useEffect, useState} from 'react';
import './image-gallery-viewer-wrapper.scss';
import Image, {StaticImageData} from 'next/image';

export type ImageGalleryViewerPropTypes = {
    images: StaticImageData[]
};

export type ImageSelectBoxPropTypes = {
    image: StaticImageData,
    currentItem: number,
    setItem: React.Dispatch<SetStateAction<number>>,
    activeItem: boolean
};

export const ImageSelectBox = (props: ImageSelectBoxPropTypes) => {
    const {
        image,
        currentItem,
        setItem,
        activeItem
    } = props;

    return <div className={`image-select-box-wrapper ${activeItem ? 'active-item' : ''} `} role={"button"} onClick={() => {
        setItem(currentItem);
    }}>
        <Image className={"select-box-image"} alt={"image-item"} src={image} />
    </div>
}

export const ImageGalleryViewer = (props: ImageGalleryViewerPropTypes) => {
    const {
        images
    } = props;

    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
    const currentImage = images[activeImageIndex];

    const { width, height } = currentImage;

    const p = Number(width) / Number(height);

    const classList = [];
    classList.push( p === 1 ? 'as-square' : '');
    classList.push( p > 1 ? 'as-landscape' : '');
    classList.push( p < 1 ? 'as-portrait' : '');
    classList.push( width > 1024 ? 'ss-desktop-view' : '');
    classList.push( width < 500 ? 'ss-mobile-view' : '');
    classList.push( height > 1300 ? 'ss-long-page' : '');
    classList.push( height < 1300 ? 'ss-viewport-page' : '');

    const realMobile = 9 / 16;
    const realDesktop = 16 / 9;
    const hFixed = p > realMobile - 0.15 && p < realMobile + 0.15;
    const wFixed = p > realDesktop - 0.15 && p < realDesktop + 0.15;
    classList.push( hFixed ? 'as-portrait-clear' : '');
    classList.push( wFixed ? 'as-landscape-clear' : '');

    const totalImagesLength = images.length;
    const handlePrev = useCallback(() => {
        // Handle previous action
        const newValueCanBe = activeImageIndex - 1;
        if (newValueCanBe >= 0) {
            setActiveImageIndex(newValueCanBe);
        }
    }, [ activeImageIndex ]);

    const handleNext = useCallback(() => {
        // Handle next action
        const newValueCanBe = activeImageIndex + 1;
        if (newValueCanBe <= totalImagesLength - 1) {
            setActiveImageIndex(newValueCanBe);
        }
    }, [ activeImageIndex, totalImagesLength ]);


    useEffect(() => {
        const handlekey = (event: any) => {
            if (event.key === 'ArrowLeft') {
                handlePrev();
            }
            if (event.key === 'ArrowRight') {
                handleNext();
            }
            if (event.key === 'ArrowDown') {
                handleNext();
            }
            if (event.key === 'ArrowUp') {
                handlePrev();
            }
        };

        // Attach the event listener when the component mounts
        window.addEventListener("keydown", handlekey);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener("keydown", handlekey);
        };
    }, [
        handlePrev, handleNext
    ])

    return (
        <div className={"image-gallery-viewer-wrapper"}>
            <div className={`image-wrapper ${classList.join(" ")} `}>
                <Image className={"gallery-image-item"} alt={"Gallery Item"} src={currentImage} />
            </div>
            <div className={"image-list-wrapper"}>
                <div className={"image-list-container"}>
                    {
                        images.map((image, index) => <ImageSelectBox key={"image-"+index} activeItem={activeImageIndex === index} image={image} setItem={setActiveImageIndex} currentItem={index} />)
                    }
                </div>
            </div>
        </div>
    );
}
