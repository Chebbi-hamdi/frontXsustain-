export function getTimeDifference(dateString) {
    const commentDate = new Date(dateString);
    const currentDate = new Date();

    const difference = currentDate.getTime() - commentDate.getTime();

    // Convert the difference to seconds
    const secondsDifference = Math.floor(difference / 1000);

    // Calculate the remaining time units
    const years = Math.floor(secondsDifference / (3600 * 24 * 30 * 12));
    const months = Math.floor((secondsDifference % (3600 * 24 * 30 * 12)) / (3600 * 24 * 30));
    const days = Math.floor((secondsDifference % (3600 * 24 * 30)) / (3600 * 24));
    const hours = Math.floor((secondsDifference % (3600 * 24)) / 3600);
    const minutes = Math.floor((secondsDifference % 3600) / 60);

    // Construct the time difference string
    let timeDifferenceString = "";

    if (years > 0) {
        timeDifferenceString += `${years} ${years > 1 ? 'years' : 'year'} `;
    }

    if (months > 0) {
        timeDifferenceString += `${months} ${months > 1 ? 'months' : 'month'} `;
    }

    if (days > 0) {
        timeDifferenceString += `${days} ${days > 1 ? 'days' : 'day'} `;
    }

    if (hours > 0) {
        timeDifferenceString += `${hours} ${hours > 1 ? 'hours' : 'hour'} `;
    }

    if (minutes > 0) {
        timeDifferenceString += `${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`;
    }

    return `Il y a ${timeDifferenceString}`;
}
