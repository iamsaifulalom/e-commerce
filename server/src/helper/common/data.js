function getLocalDate(date) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('bn-BD', {
        timeZone: "Asia/Dhaka",
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour : "2-digit",
        minute : "2-digit",
        hour12 : true
    });
}

module.exports = getLocalDate;