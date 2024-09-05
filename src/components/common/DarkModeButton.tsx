'use client'
import useDarkMode from '@/lib/darkmode/useDarkMode'

const DarkModeButton = () => {
  const [theme, toggleTheme] = useDarkMode()

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'ダークモードに切り替え' : 'ライトモードに切り替え'}
    </button>
  )
}

export default DarkModeButton
