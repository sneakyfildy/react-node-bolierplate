export const capitalize = (str) => {
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
};
const periodFormats = {
    weekly: 'YYYY-MM-DD',
    hourly: 'YYYY-MM-DD_HH'
};
export const getDateLabel = (period, momentDate) => {
    if (periodFormats[period]) {
        return momentDate.format(periodFormats[period]);
    } else {
        throw new Error('No such period');
    }
};

export const imgMap = {    
};