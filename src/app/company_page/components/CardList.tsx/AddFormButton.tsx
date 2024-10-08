// 'use client'
import PostForm from '@/app/company_page/components/form/PostForm'
import { AddCircle } from '@mui/icons-material'
import { useState } from 'react'

const AddFormButton = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className="h-auto flex-1">
      <PostForm open={open} setOpen={setOpen} title="登録" onlyTaskForm={false} />
      <button
        className="btn btn-square flex w-full flex-1 gap-3 bg-info text-gray-200 dark:btn-outline hover:border-info hover:bg-info dark:text-info dark:hover:bg-info"
        onClick={() => setOpen(true)}
      >
        <AddCircle />
        <span className="hidden sm:block">Add</span>
      </button>
    </div>
  )
}

export default AddFormButton
