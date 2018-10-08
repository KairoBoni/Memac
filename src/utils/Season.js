const APRIL = 3;
const JULY = 6;
const OCTOBER = 9;

getSeason = () => {
    MONTH = new Date().getDate();
    if (MONTH < APRIL) {
        return 'Summer';
    } else if (MONTH < JULY) {
        return 'Autumn';
    } else if (MONTH < OCTOBER) {
        return 'Winter';
    } else {
        return 'Spring';
    }
};

export const season = getSeason();