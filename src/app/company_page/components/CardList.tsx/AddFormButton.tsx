'use client'
import PostForm from '@/components/form/PostForm'
import { AddCircle } from '@mui/icons-material'
import { useState } from 'react'

const AddFormButton = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <PostForm open={open} setOpen={setOpen} title="登録" onlyTaskForm={false} />
      <button
        className="btn flex w-4/12 flex-1 gap-3 bg-info text-gray-200 dark:btn-outline hover:border-info hover:bg-info dark:text-info dark:hover:bg-info"
        onClick={() => setOpen(true)}
      >
        <AddCircle />
        <span>Add</span>
      </button>
    </>
  )
}

export default AddFormButton
