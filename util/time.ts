const ONE_MS = 1;
const ONE_SECOND = ONE_MS * 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_WEEK = ONE_DAY * 7;
const ONE_YEAR = ONE_DAY * 365;

export function timeSince(dateTime: string): string {
    const now = Date.now();
    const prev = new Date(dateTime).getTime();
    const timeDifference = (now - prev);

    const cutoffs: { name: string; value: number }[] = [
        { name: 'year', value: ONE_YEAR },
        { name: 'week', value: ONE_WEEK},
        { name: 'day', value: ONE_DAY },
        { name: 'hour', value: ONE_HOUR },
        { name: 'minute', value: ONE_MINUTE },
        { name: 'second', value: ONE_SECOND },
    ]

    for (let i = 0; i < cutoffs.length; i++) {
        const { name, value } = cutoffs[i];

        const quantity = Math.floor(timeDifference / value);
        if (quantity >= 1) {
            const plural = quantity > 1;
            return `${quantity} ${name}${plural ? 's' : ''} ago`
        }
    }
}