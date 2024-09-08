'use client'
import { Logout } from '@mui/icons-material'
import Image from 'next/image'
import { useState } from 'react'

const ProfileButton = () => {
  const [openProf, setOpenProf] = useState<boolean>(false)

  const openProfToggle = () => {
    setOpenProf(!openProf)
  }

  return (
    <div>
      <button
        className="block cursor-pointer rounded-full border-2 border-primary"
        style={{ width: '30px', height: '30px' }}
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
      <div
        className={`card absolute right-5 top-16 h-auto w-72 py-3 ${openProf ? 'block' : 'hidden'} z-50 dark:bg-gray-700`}
      >
        <div className="mx-auto flex w-11/12 flex-col items-center opacity-100">
          <div
            className="mx-auto cursor-pointer rounded-full border-2 border-primary"
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
          <button className="itmes-center btn btn-outline btn-primary mt-10 border-2 font-bold  dark:btn-active">
            <span>ログアウト</span>
            <Logout />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileButton
