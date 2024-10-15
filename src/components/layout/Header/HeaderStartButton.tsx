'use client'
import LoginForm from '@/app/components/LoginForm/LoginForm'
import { useUser } from '@/app/state/context/useUser'
import { Login } from '@mui/icons-material'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

const HeaderStartButton = () => {
  const { user } = useUser()
  const [formOpen, setFormOpen] = useState<boolean>(false)
  const LogInOutSwitch = () => {
    if (user) {
      signOut()
    }
    setFormOpen(true)
  }

  return (
    <div className={`${user ? 'hidden' : 'block'}`}>
      <LoginForm formOpen={formOpen} setFormOpen={setFormOpen} />
      <button
        className="btn btn-active btn-sm border-none bg-gradient-to-tr from-info to-orange-500 text-gray-100 dark:text-gray-800"
        onClick={LogInOutSwitch}
      >
        <Login />
        <span className="">{user ? 'Logout' : 'Login'}</span>
      </button>
    </div>
  )
}

export default HeaderStartButton
