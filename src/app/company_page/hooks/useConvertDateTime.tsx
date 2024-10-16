'use client'

const useConvertDateTime = () => {
  const conversionDateTime = (originalDate: string) => {
    const date = new Date(originalDate).toLocaleDateString()
    const hours = String(new Date(originalDate).getHours()).padStart(2, '0')
    const minuites = String(new Date(originalDate).getMinutes()).padStart(2, '0')
    return `${date} ${hours}:${minuites}`
  }

  const MonthDay = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    // 月と日を取得
    const startMonth = startDate.getMonth() + 1
    const endMonth = endDate.getMonth() + 1
    const startDay = startDate.getDate()
    const endDay = endDate.getDate()
    return `${startMonth}/${startDay} - ${endMonth}/${endDay}`
  }
  const MonthDayTime = (original: string) => {
    const date = new Date(original)
    // 月と日を取得
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minuites = date.getMinutes()
    return `${month}/${day} ${hours}:${minuites}`
  }

  return { conversionDateTime, MonthDay, MonthDayTime }
}

export default useConvertDateTime
