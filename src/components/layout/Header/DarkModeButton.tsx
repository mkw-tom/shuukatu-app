'use client'
import useDarkMode from '@/lib/darkmode/useDarkMode'
import { DarkMode, LightMode } from '@mui/icons-material'
import { Button, ButtonGroup } from '@mui/material'
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
    <Button
      key="light"
      startIcon={<LightMode />}
      onClick={handleLight}
      className="dark:bg-blue-500 dark:text-white"
    >
      Light
    </Button>,
    <Button
      key="dark"
      startIcon={<DarkMode />}
      onClick={handleDark}
      className="dark:bg-blue-500 dark:text-white"
    >
      Dark
    </Button>,
  ]

  return (
    <div>
      <div
        onClick={() => setOpenButtons(true)}
        className="border-2p-1  cursor-pointer rounded-full p-1 text-blue-500 dark:bg-blue-500 dark:text-white"
      >
        {theme === 'light' ? <LightMode /> : <DarkMode />}
      </div>
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant={theme === 'light' ? 'outlined' : 'contained'}
        className={`${openButtons ? 'flex' : 'hidden'} absolute right-8 top-20 flex-col shadow-md`}
      >
        {buttons}
      </ButtonGroup>
    </div>
  )
}

export default DarkModeButton
