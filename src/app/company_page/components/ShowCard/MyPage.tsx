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
      className={`mt-2 ${selectPost?.mypage.url ? 'flex' : 'hidden'} items-center gap-5 rounded-sm bg-gray-100 p-2 dark:bg-gray-700`}
    >
      <a
        href="/"
        target="blank"
        className="flex items-center rounded-md bg-gray-500 px-2 py-1 text-sm text-white duration-150 hover:opacity-40"
      >
        <span className="mr-1">マイページ</span>
        <ArrowOutward className="text-sm" />
      </a>

      <div className="flex flex-col items-start gap-1 dark:text-gray-400">
        <p>
          <span>ID：</span>
          <span>{idPassOpen ? (selectPost?.mypage?.id as string) : '**********'}</span>
        </p>
        <p>
          <span>Password：</span>
          <span>{idPassOpen ? (selectPost?.mypage?.password as string) : '*********'}</span>
        </p>
      </div>
      <button
        className="bg-gray-00 ml-auto px-3 opacity-70 dark:text-gray-200"
        onClick={idPassToggle}
      >
        {idPassOpen ? <VisibilityOff /> : <RemoveRedEye />}
      </button>
    </div>
  )
}

export default Mypage
