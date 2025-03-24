export const formatStopwatchTime = (ms: number, showMs = true) => {
    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const milliseconds = Math.floor(ms % 1000)

    const minSecMs =
        `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}` +
        (showMs ? `:${milliseconds.toString().padStart(3, '0')}` : '')

    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minSecMs}`
    }
    return minSecMs
}

export const formatTimeWithoutMilliseconds = (ms: number) => {
    return formatStopwatchTime(ms, false)
}
