'use client'
import { Logout } from '@mui/icons-material'
import { Button, Card, CardContent } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

const ProfileButton = () => {
  const [openProf, setOpenProf] = useState<boolean>(false)

  const openProfToggle = () => {
    setOpenProf(!openProf)
  }

  return (
    <>
      <button
        className="cursor-pointer rounded-full border-2 border-blue-500"
        onClick={openProfToggle}
      >
        <Image
          src="/noAvatar.png"
          width={30}
          height={30}
          alt="ユーザー画像"
          className="rounded-full"
        />
      </button>
      <Card className={`absolute right-5 top-16 h-auto w-72 py-3 ${openProf ? 'block' : 'hidden'}`}>
        <CardContent className="mx-auto flex w-11/12 flex-col items-center">
          <div
            className="mx-auto cursor-pointer rounded-full border-2 border-blue-500"
            style={{ width: '70px', height: '70px' }}
          >
            <Image
              src="/noAvatar.png"
              width={70}
              height={70}
              alt="ユーザー画像"
              className="rounded-full"
            />
          </div>
          <h3 className="mt-2">username</h3>
          <ul className="mt-5 flex flex-col items-center gap-2">
            <li>内定・参加確定済み：２社</li>
            <li>全ての企業：12社</li>
          </ul>
          <Button
            variant="outlined"
            className="mt-10 border-2 border-blue-500 font-bold text-blue-600 dark:bg-blue-500  dark:text-white "
            endIcon={<Logout />}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </>
  )
}

export default ProfileButton
