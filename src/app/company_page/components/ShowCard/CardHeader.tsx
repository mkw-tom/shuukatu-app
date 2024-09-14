'use client'
import PostForm from '@/components/form/PostForm'
import { Delete, Edit, Group } from '@mui/icons-material'
import { useState } from 'react'

const CardHeader = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="flex items-start justify-between">
      <PostForm open={open} setOpen={setOpen} title="編集" onlyTaskForm={false} />
      <div className="flex flex-col items-start justify-start">
        <h2 className="border-l-4 border-l-info pl-3 text-2xl tracking-wider dark:text-gray-200">
          株式会社テスト
        </h2>
        <h3 className="ml-5 text-gray-500 dark:text-gray-400">インターンシップ短期</h3>
        <div className="ml-5 flex items-center gap-1">
          <Group className="text-info" />
          <p className="font-bold text-info dark:text-info ">グループ面接</p>
        </div>
      </div>
      <div className="flex">
        <button
          className="btn  btn-link btn-sm text-gray-400 hover:text-info"
          onClick={() => setOpen(true)}
        >
          <Edit style={{ fontSize: '20px' }} />
          編集
        </button>
        <button className="btn btn-link btn-sm text-gray-400 hover:text-error">
          <Delete style={{ fontSize: '20px' }} />
          削除
        </button>
      </div>
    </div>
  )
}

export default CardHeader
