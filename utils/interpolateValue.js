export const interpolateValue = (x1, y1, x2, y2, x) => {
    const slope = (y2 - y1) / (x2 - x1);
    const y = slope * (x - x1) + y1;
    return y;
};