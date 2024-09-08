'use client'
import useDarkMode from '@/lib/darkmode/useDarkMode'
import { DarkMode, LightMode } from '@mui/icons-material'
import { useState } from 'react'

const DarkModeButton = () => {
  const [theme, changeDark, changeLight] = useDarkMode()
  const [openButtons, setOpenButtons] = useState<boolean>(false)

  const handleLight = () => {
    changeLight()
    setOpenButtons(false)
  }

  const handleDark = () => {
    changeDark()
    setOpenButtons(false)
  }

  const buttons = [
    <button
      key="light"
      onClick={handleLight}
      className="w-full rounded-t-xl py-2 text-primary duration-200 hover:bg-primary hover:text-gray-200 dark:text-gray-200"
    >
      <LightMode />
      <span>Light</span>
    </button>,
    <button
      key="dark"
      onClick={handleDark}
      className="w-full rounded-b-xl py-2 text-primary duration-200 hover:bg-primary hover:text-gray-200 dark:text-gray-200"
    >
      <DarkMode />
      <span>Dark</span>
    </button>,
  ]

  return (
    <div>
      <div
        onClick={() => setOpenButtons(true)}
        className="z-50 cursor-pointer rounded-full p-1 text-primary dark:bg-primary dark:text-white"
      >
        {theme === 'light' ? <LightMode /> : <DarkMode />}
      </div>

      <div
        className={`card w-40 border-2 bg-white ${openButtons ? 'flex' : 'hidden'} absolute right-8 top-20 z-50 flex-col items-start shadow-md dark:border-gray-500 dark:bg-gray-500 `}
      >
        {buttons}
      </div>
    </div>
  )
}

export default DarkModeButton
