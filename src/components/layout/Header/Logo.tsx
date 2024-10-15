'use client'
import { useUser } from '@/app/state/context/useUser'
import Image from 'next/image'

const Logo = () => {
  const { user } = useUser()
  return (
    <div className=" ">
      <h1 className={`flex items-center ${!user ? 'w-full justify-center' : ''} `}>
        <Image
          src="/file.png"
          width={50}
          height={50}
          alt="ユーザー画像"
          className="mr-2 rounded-md"
        />
        <p className="mr-1 bg-gradient-to-r from-info to-orange-400 bg-clip-text text-2xl font-bold  tracking-widest text-transparent">
          Entrix
        </p>
      </h1>
    </div>
  )
}

export default Logo
