export const getColor = (size: number) => {
    if (size > 10485760) return '#a13000';
    return '#00a156';
};

export const getSize = (size: number) => {
    return (size / 1048576).toFixed(2)
};