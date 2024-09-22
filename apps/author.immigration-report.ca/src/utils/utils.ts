
export const useScreenType = (width: number) => {
    if (!width) {
        return "xl";
    } else if (width < 640) {
        return  "xs";
    } else if (width >= 640 && width < 768) {
        return  "md";
    } else if (width >= 768 && width < 1024) {
        return  "lg";
    } else if (width >= 1024 && width < 1280) {
        return  "xl";
    } else if (width >= 1280 && width < 1536) {
        return  "2xl";
    }
}
