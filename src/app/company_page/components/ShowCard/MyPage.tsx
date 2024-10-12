'use client'
import { usePost } from '@/app/company_page/context/usePost'
import { ArrowOutward, RemoveRedEye, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'

const Mypage = () => {
  const { selectPost } = usePost()
  const [idPassOpen, setIdPassOpen] = useState<boolean>(false)
  const idPassToggle = () => {
    setIdPassOpen(!idPassOpen)
  }

  return (
    <div
      className={`mt-2 ${selectPost?.mypage.url ? 'flex' : 'hidden'} w-full flex-col items-center justify-between  rounded-sm bg-base-300 p-2 dark:bg-gray-600`}
    >
      <div className="flex w-full justify-between">
        {/* <a
          href="/"
          target="blank"
          className="flex items-center rounded-md bg-gray-500 px-2 py-1 text-sm text-white duration-150 hover:opacity-40"
        >
          <span className="mr-1 text-xs md:text-sm">マイページ</span>
          <ArrowOutward className="text-sm" />
        </a> */}

        <div className="flex flex-1 flex-col items-start gap-1 ">
          <p>
            <span
              className={`border-l-2 pl-2 ${selectPost?.failed ? 'border-l-error' : ''} ${selectPost?.completed ? 'border-orange-500' : 'border-info'}`}
            >
              ID：
            </span>
            <span>{idPassOpen ? (selectPost?.mypage?.id as string) : '**********'}</span>
          </p>
          <p>
            <span
              className={`border-l-2 pl-2 ${selectPost?.failed ? 'border-l-error' : ''} ${selectPost?.completed ? 'border-orange-500' : 'border-info'}`}
            >
              Password：
            </span>
            <span>{idPassOpen ? (selectPost?.mypage?.password as string) : '*********'}</span>
          </p>
        </div>

        <div className="mr-5 flex w-20 flex-row items-center sm:mr-24">
          <button
            className=" ml-auto px-3 text-gray-700 dark:text-gray-200 "
            onClick={idPassToggle}
          >
            {idPassOpen ? <VisibilityOff /> : <RemoveRedEye />}
          </button>
          <a
            href="/"
            target="blank"
            className=" btn-error hidden items-center rounded-md border-b-2  px-2 text-sm duration-150 hover:opacity-40 sm:flex "
          >
            <span className=" btn btn-link text-xs text-gray-500 md:text-sm">マイページへ</span>
            {/* <ArrowOutward className="text-sm" /> */}
          </a>
        </div>
      </div>
      <a
        href="/"
        target="blank"
        className="mt-3 flex h-8 w-full items-center justify-center rounded-sm  border-b-2 bg-gray-300 px-1 text-sm duration-300 hover:opacity-70 dark:bg-gray-400 dark:text-gray-100 sm:hidden "
      >
        <span className="mr-1 text-sm md:text-sm ">マイページへ</span>
        <ArrowOutward className="text-sm" />
      </a>
    </div>
  )
}

export default Mypage
