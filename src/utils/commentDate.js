function timeAgo(dateString) {
    const date = new Date(dateString);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const seconds = Math.round((today - date) / 1000);

    if (seconds < 20) {
        return "сейчас";
    } else if (seconds < 60) {
        return "1 минуту назад";
    }

    const minutes = Math.round(seconds / 60);
    if (minutes < 5) {
        return `${minutes} минут назад`;
    } else if (minutes < 10) {
        return "10 минут назад";
    } else if (minutes < 30) {
        return "30 минут назад";
    }

    const isToday = today.toDateString() === date.toDateString();
    if (isToday) {
        return "Сегодня " + date.getHours() + ":" + date.getMinutes();
    }

    const yesterday = new Date(today - DAY_IN_MS);
    const isYesterday = yesterday.toDateString() === date.toDateString();
    if (isYesterday) {
        return "Вчера" + date.getHours() + ":" + date.getMinutes();
    }

    const daysDiff = Math.round((today - date) / (1000 * 60 * 60 * 24));
    if (daysDiff < 30) {
        return `${date.getDay()}.${date.getMonth()} - ${daysDiff} дней назад`;
    }
    if (daysDiff < 60) {
        return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()} - ${daysDiff} дней назад`;
    }
    const monthsDiff =
        today.getMonth() -
        date.getMonth() +
        12 * (today.getFullYear() - date.getFullYear());
    if (monthsDiff < 12) {
        return `${monthsDiff} месяцев назад`;
    }

    if (date.toDateString() === "Invalid Date") {
        return `${today.getDay()}.${today.getMonth()}.${today.getFullYear()}`;
    } else return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
}
export default timeAgo;
