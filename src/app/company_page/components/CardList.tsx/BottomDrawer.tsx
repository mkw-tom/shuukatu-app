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
      // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
      className={`sm:hidden ${selectPost ? 'fixed' : 'hidden'} ${open ? 'inset-0 z-50 bg-black bg-opacity-40' : ''} `}
    >
      <div
        className={`fixed inset-x-0 bottom-0 h-[600px] w-full flex-col ${open ? 'translate-none' : 'translate-y-[515px]'} rounded-t-3xl bg-base-200 px-5 pb-12 pt-1  dark:bg-gray-700 lg:hidden   ${selectPost ? 'fixed' : 'hidden'} border-2 shadow-xl transition duration-300 dark:border-none`}
      >
        <button
          className="mx-auto block h-10 w-full rounded-full transition duration-100 "
          onClick={handleOpen}
        >
          <div className=" mx-auto block h-2 w-20 rounded-full bg-gray-500 shadow-lg"></div>
        </button>
        <div className={`size-full overflow-scroll pb-10  ${open ? '' : 'pointer-events-none'} `}>
          <ShowCard />
        </div>
      </div>
    </div>
  )
}

export default BottomDrawer
