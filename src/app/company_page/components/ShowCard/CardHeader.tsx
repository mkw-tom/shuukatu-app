'use client'
import PostForm from '@/app/company_page/components/form/PostForm'
// import { usePostReducer } from '@/app/company_page/context/useFormInputReducer'
import { usePostReducer } from '@/app/state/context/useFormInputReducer'
import { usePost } from '@/app/state/context/usePost'
import type { FormPostType } from '@/types/reducerType'
import { Delete, Edit } from '@mui/icons-material'
import type { ReactNode } from 'react'
import { useState } from 'react'
import useTaskJudger from '../../hooks/useTaskJudger'

const CardHeader = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { selectPost, postsDispatch, setSelectPost, posts, currentTask, prevTask } = usePost()
  const { state, dispatch } = usePostReducer()
  const { taskIconJudger } = useTaskJudger()

  const taskNameJudge = (): string => {
    if (!currentTask && !selectPost?.completed) {
      return prevTask?.task as string
    } else if (!currentTask) {
      return '内定・参加確定'
    } else if (currentTask?.current) {
      return currentTask.task as string
    } else if (!currentTask.current && prevTask) {
      return prevTask?.task as string
    } else {
      return 'なし'
    }
  }

  const taskName: ReactNode = taskNameJudge()

  const handleDeletePost = () => {
    if (!confirm(`${selectPost?.name}をリストから削除しますか？`)) {
      return
    }
    const url = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DEV_API_URL

    try {
      const res = fetch(`${url}/api/posts?postId=${selectPost?.customId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      postsDispatch({ type: 'DELETE_POST', postId: selectPost?.customId as string })
      setOpen(false)
      setSelectPost(posts[0])
    } catch (error) {
      console.log(`faild fetch : ${error}`)
    }
  }

  const openEditForm = () => {
    const { taskFlow, ...data } = selectPost as PostType
    const initializeData = { ...data } as FormPostType

    dispatch({ type: 'INITIALIZE', payload: initializeData })
    setOpen(true)
  }

  return (
    <div className="mb-2 flex items-start justify-between">
      <PostForm open={open} setOpen={setOpen} title="編集" onlyTaskForm={false} />
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <div className="shadow-b-md fixed inset-x-10  flex items-center justify-between bg-base-200 py-1 dark:bg-gray-700 sm:inset-x-5 sm:pt-6">
          <h2
            className={`border-l-4 ${selectPost?.failed ? 'border-l-error' : 'border-l-info'} ${selectPost?.completed ? 'border-l-orange-500' : ''}  pl-3 text-lg tracking-wider dark:text-gray-200 sm:text-2xl`}
          >
            {selectPost?.name as string}
          </h2>
          <div className="flex">
            <button
              className="btn  btn-link btn-sm text-gray-400 hover:text-info"
              onClick={openEditForm}
            >
              <Edit style={{ fontSize: '20px' }} />
              <span className="hidden sm:block">編集</span>
            </button>
            <button
              className="btn btn-link btn-sm text-gray-400 hover:text-error"
              onClick={handleDeletePost}
            >
              <Delete style={{ fontSize: '20px' }} />
              <span className="hidden sm:block">削除</span>
            </button>
          </div>
        </div>
        <h3 className="text-bold badge badge-md ml-5 mt-[42px] bg-gray-300  text-gray-700 sm:badge-lg dark:text-gray-800 sm:mt-16">
          {selectPost?.event as string}
        </h3>
        <div
          className={`${selectPost?.failed ? 'text-error' : 'text-info'}  ${selectPost?.completed ? 'text-orange-500' : ''} ml-5 flex w-auto items-center gap-1`}
        >
          {taskIconJudger(taskName as string)}
          <p
            className={`md:text-md text-sm font-bold  ${selectPost?.failed ? 'text-error' : 'text-info'} ${selectPost?.completed ? 'text-orange-500' : ''}`}
          >
            {taskName}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardHeader
