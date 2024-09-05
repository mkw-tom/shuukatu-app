'use client'
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const useDarkMode = (): [Theme, () => void] => {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const saveTheme = localStorage.getItem('theme') as Theme
    if (theme) {
      document.documentElement.classList.add(saveTheme)
      setTheme(saveTheme)
    }
  }, [theme])

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      localStorage.setItem('theme', 'light')
      setTheme('light')
    }
  }

  return [theme, toggleTheme]
}

export default useDarkMode
