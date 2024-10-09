'use client'

const useConvertDateTime = () => {
  const conversionDateTime = (originalDate: string) => {
    const date = new Date(originalDate).toLocaleDateString()
    const hours = String(new Date(originalDate).getHours()).padStart(2, '0')
    const minuites = String(new Date(originalDate).getMinutes()).padStart(2, '0')
    return `${date} ${hours}:${minuites}`
  }

  return conversionDateTime
}

export default useConvertDateTime
