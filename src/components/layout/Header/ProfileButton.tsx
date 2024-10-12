'use client'
import { useUser } from '@/app/company_page/context/useUser'
import { Logout } from '@mui/icons-material'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const ProfileButton = () => {
  const { user } = useUser()
  const router = useRouter()

  return (
    <div className={`${!user ? 'hidden' : 'group'}`}>
      <button
        className=" block cursor-pointer rounded-full"
        style={{ width: '30px', height: '30px' }}
      >
        <img
          src={user?.profilePicture ? `${user?.profilePicture}` : '/noAvatar.png'}
          width={30}
          height={30}
          alt="ユーザー画像"
          className="rounded-full"
        />
      </button>
      <div
        className={` absolute right-5 top-8 z-50 hidden h-auto  w-72 rounded-lg bg-base-200 py-3 shadow-xl group-hover:block dark:bg-gray-700`}
      >
        <div className="mx-auto flex w-11/12 flex-col items-center opacity-100">
          <div
            className="border-infore mx-auto mt-5 cursor-pointer rounded-full"
            style={{ width: '70px', height: '70px' }}
          >
            <img
              src={user?.profilePicture ? `${user?.profilePicture}` : '/noAvatar.png'}
              width={70}
              height={70}
              alt="ユーザー画像"
              className="rounded-full"
            />
          </div>
          <h3 className="mt-2">{user?.username}</h3>
          <ul className="mt-5 flex flex-col items-center gap-2">
            <li>内定・参加確定済み：２社</li>
            <li>全ての企業：12社</li>
          </ul>
          <button
            className="itmes-center btn mt-5 bg-gradient-to-tr from-info to-orange-500 font-bold  text-white dark:text-gray-900"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <span>Logout</span>
            <Logout />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileButton
