/* eslint-disable tailwindcss/classnames-order */
'use client'
import { PostReducerContextProvider } from '@/app/context/usePostReducer'
import { useState } from 'react'
import CompanyForm from './CompanyForm'
import MypageForm from './MypageForm'
import TaskForm from './TaskForm'

const PostForm = ({
  open,
  setOpen,
  title,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
}) => {
  const [formSlide, setFormSlide] = useState<string>('-translate-x-none')

  return (
    <PostReducerContextProvider>
      <div className={`${open ? 'fixed' : 'hidden'} inset-0 z-50 bg-black bg-opacity-90 `}>
        <div className="card mx-auto mt-20 h-auto w-[500px] overflow-hidden bg-white">
          <div className={`flex flex-row ${formSlide}`} style={{ width: 'calc(100% * 3)' }}>
            <CompanyForm setOpen={setOpen} title={title} setFormSlide={setFormSlide} />
            <MypageForm setOpen={setOpen} title={title} setFormSlide={setFormSlide} />
            <TaskForm setOpen={setOpen} title={title} setFormSlide={setFormSlide} />
          </div>
        </div>
      </div>
    </PostReducerContextProvider>
  )
}

export default PostForm
