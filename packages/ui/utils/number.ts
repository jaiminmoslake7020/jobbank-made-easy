export const getRandomInt2 = (min:number, max:number) => {
    min = Math.ceil(min);   // Ensure min is an integer
    max = Math.floor(max);  // Ensure max is an integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomInt = (max:number) => {
    return Math.floor(Math.random() * max);
}

export const getRandomViewport = (width: number, height:number) => {
    return {
        x: getRandomInt(width),
        y: getRandomInt(height),
    };
}
