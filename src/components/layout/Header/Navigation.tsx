'use client'
import { useUser } from '@/app/state/context/useUser'
import { Business, MultilineChart, PersonSearch } from '@mui/icons-material'
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
      <Link href="/chart_page">
        <button className="flex items-center gap-1 text-info transition-opacity duration-300 hover:opacity-70  dark:text-gray-200">
          <MultilineChart />
          <span>チャート</span>
        </button>
      </Link>
      <Link href="/analysis_page">
        <button className="flex items-center gap-1  text-info transition-opacity duration-300 hover:opacity-70  dark:text-gray-200">
          <PersonSearch />
          <span>適職診断</span>
        </button>
      </Link>
    </nav>
  )
}

export default Navigation
