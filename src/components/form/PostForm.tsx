'use client'
import { useState } from 'react'
import CompanyForm from './CompanyForm'
import MypageForm from './MypageForm'
import TaskForm from './TaskForm'

const PostForm = ({
  open,
  setOpen,
  title,
  onlyTaskForm,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  onlyTaskForm: boolean
}) => {
  const [formSlide, setFormSlide] = useState<string>('-translate-x-1000')

  return (
    <div className={`${open ? 'fixed' : 'hidden'} inset-0 z-50 bg-black bg-opacity-90 `}>
      <div className="card mx-auto mt-20 h-auto w-[450px] overflow-hidden bg-white sm:w-[500px]">
        <div
          className={`flex flex-row ${onlyTaskForm ? '-translate-x-[1000px] ' : formSlide}`}
          style={{ width: 'calc(100% * 3)' }}
        >
          <CompanyForm setOpen={setOpen} title={title} setFormSlide={setFormSlide} />
          <MypageForm setOpen={setOpen} title={title} setFormSlide={setFormSlide} />
          <TaskForm setOpen={setOpen} title={title} setFormSlide={setFormSlide} />
        </div>
      </div>
    </div>
  )
}

export default PostForm
