import fs from 'fs';


export const getStatistics = () => {
    const data = fs.readFileSync('statistics.json', 'utf8');
    return JSON.parse(data);
};

export const updateStatistics = (type) => {
    const stats = getStatistics();
    if (type === 'photo') {
        stats.photos += 1;
    } else if (type === 'gif') {
        stats.gifs += 1;
    }
    fs.writeFileSync('statistics.json', JSON.stringify(stats, null, 2));
};
