getSeason = () => {
    date = new Date().getDate();
    if (date < 3) {
        return 'Summer';
    } else if (date < 6) {
        return 'Autumn';
    } else if (date < 9) {
        return 'Winter';
    } else {
        return 'Spring';
    }
};

export const season = getSeason();