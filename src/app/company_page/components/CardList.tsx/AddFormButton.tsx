'use client'
import PostForm from '@/components/form/PostForm'
import { AddCircle } from '@mui/icons-material'
import { useState } from 'react'

const AddFormButton = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <PostForm open={open} setOpen={setOpen} title="企業を追加" />
      <button
        className="btn btn-outline btn-primary flex flex-1 gap-3 dark:btn-active dark:text-gray-200"
        onClick={() => setOpen(true)}
      >
        <AddCircle />
        <span>Add</span>
      </button>
    </>
  )
}

export default AddFormButton
