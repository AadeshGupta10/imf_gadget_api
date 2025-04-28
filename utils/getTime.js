const getTime = () => {
    const istDate = new Date().toLocaleString("en-GB", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).replace(',', '');

    return istDate.split('/').reverse().join('-').replace(',', '');
}

module.exports = getTime;