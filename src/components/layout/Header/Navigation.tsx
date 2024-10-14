'use client'
import { useUser } from '@/app/state/context/useUser'
import { Addchart, Business, MenuBook } from '@mui/icons-material'
import Link from 'next/link'

const Navigation = () => {
  const { user } = useUser()
  return (
    <nav className={` ${!user ? 'hidden' : 'hidden gap-7 md:flex'}`}>
      <Link href="/company_page">
        <button className="flex items-center gap-1  text-info  transition-opacity duration-300 hover:opacity-70 dark:text-gray-200">
          <Business />
          <span>企業管理</span>
        </button>
      </Link>
      <Link href="/">
        <button className="flex items-center gap-1  text-info transition-opacity duration-300 hover:opacity-70  dark:text-gray-200">
          <MenuBook />
          <span>ES管理</span>
        </button>
      </Link>
      <Link href="/">
        <button className="flex items-center gap-1 text-info transition-opacity duration-300 hover:opacity-70  dark:text-gray-200">
          <Addchart />
          <span>チャート</span>
        </button>
      </Link>
    </nav>
  )
}

export default Navigation
