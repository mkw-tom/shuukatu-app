'use client'
import { AccountBox } from '@mui/icons-material'
import { useState } from 'react'
import LoginForm from '../LoginForm/LoginForm'

const StartButton = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false)
  return (
    <>
      <LoginForm formOpen={formOpen} setFormOpen={setFormOpen} />
      <button
        className="btn btn-active mt-20 w-[300px] border-none bg-orange-500 text-gray-100 dark:text-gray-800 "
        onClick={() => setFormOpen(true)}
      >
        <AccountBox />
        <span className="">Get started</span>
      </button>
    </>
  )
}

export default StartButton
