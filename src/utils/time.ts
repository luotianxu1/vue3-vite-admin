// 秒转换为HH:mm:ss
export const formatterSToHMS = (val: number) => {
  const time = val * 1000
  const days = time / 1000 / 60 / 60 / 24
  const daysRound = Math.floor(days)
  const hours = time / 1000 / 60 / 60 - (24 * daysRound)
  const hoursRound = Math.floor(hours)
  const minutes = time / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound)
  const minutesRound = Math.floor(minutes)
  const seconds = time / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound)
  return hoursRound + ':' + minutesRound + ':' + seconds
}
