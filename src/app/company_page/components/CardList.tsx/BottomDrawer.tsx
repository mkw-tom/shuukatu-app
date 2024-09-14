'use client'
import ShowCard from '@/app/company_page/components/ShowCard/ShowCard'
import { useState } from 'react'

const BottomDrawer = ({ selectPost }: { selectPost: { name: string; event: string } | null }) => {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => {
    setOpen(!open)
  }
  return (
    <div
      className={`lg:hidden ${selectPost ? 'fixed' : 'hidden'} ${open ? 'inset-0 z-50 bg-black bg-opacity-90' : ''} `}
    >
      <div
        className={`fixed inset-x-0 bottom-0 h-[600px] w-full flex-col ${open ? 'translate-none' : 'translate-y-[470px]'} rounded-t-xl bg-base-200 px-5 pb-12 pt-1  dark:bg-gray-800 lg:hidden   ${selectPost ? 'fixed' : 'hidden'} transition duration-300`}
      >
        <button
          className="mx-auto mb-2 block h-10 w-full rounded-full transition duration-100 hover:bg-base-300 dark:hover:bg-gray-700"
          onClick={handleOpen}
        >
          <div className=" mx-auto block h-2 w-20 rounded-full bg-gray-500"></div>
        </button>
        <div className="mb-10 size-full overflow-scroll">
          <ShowCard />
        </div>
      </div>
    </div>
  )
}

export default BottomDrawer
