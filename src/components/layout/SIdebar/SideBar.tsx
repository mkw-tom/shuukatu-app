'use client'
import { useUser } from '@/app/state/context/useUser'
import useDarkMode from '@/lib/darkmode/useDarkMode'
import { Business, MultilineChart, PersonSearch } from '@mui/icons-material'
import Link from 'next/link'
import { useState } from 'react'

const SideBar = () => {
  const [open, setOpne] = useState<boolean>(false)
  const [theme] = useDarkMode()
  const { user } = useUser()

  const sidebarItems = [
    { icon: <Business className="mr-auto text-info" />, text: '企業管理', link: '/company_page' },
    {
      icon: <MultilineChart className="mr-auto text-info" />,
      text: 'チャート',
      link: '/chart_page',
    },
    {
      icon: <PersonSearch className="mr-auto text-info" />,
      text: '適職診断',
      link: '/analysis_page',
    },
  ]

  return (
    <div className={`drawer w-auto md:hidden ${user ? '' : 'hidden'}`}>
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="flex-none lg:hidden">
          <label
            htmlFor="my-drawer-3"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block size-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        {/* Page content here */}
      </div>
      <div className="drawer-side z-50 ">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay "></label>
        <ul className="menu flex min-h-full w-56 flex-col items-center bg-base-100 p-4 dark:bg-gray-700">
          {sidebarItems.map((item, index) => (
            <Link key={index} href={item.link} className="w-full">
              <button className="btn btn-ghost flex w-full items-center">
                {item.icon}
                <span className="mr-auto text-info">{item.text}</span>
              </button>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SideBar
