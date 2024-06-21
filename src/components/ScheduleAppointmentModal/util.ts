export const getTimeIntervals = () => {
    const intervals: string[] = [];

    for (let i = 9; i < 20; i++) {
        for (let j = 0; j < 46; j = j + 15) {
            intervals.push(`${i}:${j}`);
        }
    }

    return intervals;
}