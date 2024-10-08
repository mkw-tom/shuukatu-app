'use client'
import PostForm from '@/app/company_page/components/form/PostForm'
import { usePostReducer } from '@/app/company_page/context/useFormInputReducer'
import { usePost } from '@/app/company_page/context/usePost'
import {
  AddCircle,
  AssignmentInd,
  Celebration,
  CheckCircle,
  Delete,
  Edit,
  Group,
  Person,
  Verified,
} from '@mui/icons-material'
// import { useRouter } from 'next/navigation'
import { useState } from 'react'

const judgeIcon = (taskname: string) => {
  switch (taskname) {
    case 'ES・履歴書提出':
      return <AssignmentInd />
    case '面接':
      return <Person />
    case 'グループ面接':
      return <Group />
  }
}

const TaskFLow = () => {
  const {
    selectPost,
    setSelectPost,
    setSelectTask,
    selectTask,
    postsState,
    postsDispatch,
    currentTask,
  } = usePost()
  const [open, setOpen] = useState<boolean>(false)
  const [formTitle, setFormTitle] = useState<string>('')
  const { state, dispatch } = usePostReducer()
  // const router = useRouter()

  const TaskDelete = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DEV_API_URL
    const postId = selectPost?.customId
    const taskId = selectTask?.customId

    try {
      const res = await fetch(`${url}/api/posts/task?postId=${postId}&taskId=${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // JSONデータを送ることを明示
        },
      })

      //postsの状態を更新
      postsDispatch({
        type: 'DELETE_TASK',
        postId: selectPost?.customId as string,
        taskId: selectTask?.customId as string,
      })

      setSelectPost((prev) => {
        if (!prev) return null
        return {
          ...prev,
          taskFlow: prev.taskFlow.filter(
            (task: { customId: string | undefined }) => task.customId !== selectTask?.customId,
          ),
        }
      })

      // router.refresh()

      console.log('🦁 Success delete')
      return 'Success delete'
    } catch (error) {
      console.error('🦁 An error occurred:', error)
      return 'An error occurred'
    }
  }

  const TaskFormOpen = (title: string) => {
    setFormTitle(title)
    setOpen(true)
    if (title === '編集') {
      dispatch({ type: 'INITIALIZE_TASK', payload: selectTask as FormInputTaskType })
    }
  }

  const handleSelectTask = (task: FormInputTaskType) => {
    setSelectTask(task)
  }

  return (
    <div className="mt-5 flex w-full flex-col">
      <PostForm open={open} setOpen={setOpen} title={formTitle} onlyTaskForm={true} />
      <div className="mb-1 flex items-center justify-between gap-3">
        <h2 className="block h-6 border-l-2 border-l-info pl-2">選考フロー</h2>
        <button
          className="btn btn-sm flex items-center justify-center rounded-full border-none text-gray-400 hover:bg-info hover:text-gray-100 dark:bg-gray-600 dark:hover:bg-info dark:hover:text-gray-200"
          onClick={() => TaskFormOpen('追加')}
        >
          <AddCircle />
          タスクを追加
        </button>
      </div>

      <div className="h-auto max-h-[300px] w-full overflow-x-scroll">
        <ul className="timeline timeline-horizontal mb-5 flex lg:ml-0">
          {selectPost?.taskFlow?.map((task, index) => (
            <li key={index}>
              <hr
                className={`${task?.finished || task.current ? 'bg-info' : ''} ${index === 0 ? 'hidden' : ''}`}
              />
              <div className="timeline-middle">
                {task?.finished ? (
                  <CheckCircle className={`${task.finished ? 'text-info' : 'text-gray-400'}`} />
                ) : (
                  <p
                    className={`mx-1 size-5 animate-pulse rounded-full ${task.current ? 'bg-info' : 'bg-gray-400'}`}
                  ></p>
                )}
              </div>
              <button
                className={`timeline-end timeline-box flex cursor-pointer items-center gap-1 hover:bg-gray-300 ${task === selectTask ? 'bg-gray-300' : ''}`}
                onClick={() => handleSelectTask(task)}
              >
                <span className={`${task.finished ? 'text-info' : 'text-gray-500'}`}>
                  {judgeIcon(task.task)}
                </span>
                <span className={`${task.finished ? 'text-info' : 'text-gray-500'} `}>
                  {task.task}
                </span>
              </button>
              <hr className={`${task.finished ? 'bg-info' : ''} ${index === -1 ? 'hidden' : ''}`} />
            </li>
          ))}
          {!selectPost?.taskFlow[0] ? (
            <li
              className="mt-3 flex h-[200px] w-full cursor-pointer flex-col justify-center border-2 border-dashed pt-3 text-center hover:bg-sky-100"
              onClick={() => TaskFormOpen('追加')}
            >
              <span>タスクが未登録です💦</span>
              <button className="btn btn-link btn-info">タスクを追加</button>
            </li>
          ) : (
            <li>
              <hr className={`${selectPost?.completed ? 'bg-orange-400' : ''}`} />
              <div className="timeline-middle">
                <Verified className="text-orange-500" />
              </div>
              <div className="timeline-end timeline-box text-orange-500">
                <Celebration className="flex items-center gap-1 text-orange-500" />
                <span>内定・参加確定</span>
              </div>
            </li>
          )}
        </ul>
      </div>

      {currentTask ? (
        <div className="mt-3 flex w-full flex-col gap-1 rounded-md border-2 p-2">
          <div className="flex justify-between">
            <h3 className="flex items-center gap-2 border-l-2 border-l-info pl-2">
              <span className="text-info">{judgeIcon(currentTask?.task as string)}</span>
              <span className="text-info">{currentTask?.task as string}</span>
            </h3>
            <nav className="flex items-center">
              <button
                className="btn  btn-link btn-sm text-gray-400 hover:text-info"
                onClick={() => TaskFormOpen('編集')}
              >
                <Edit style={{ fontSize: '20px' }} />
                編集
              </button>
              <button
                className="btn btn-link btn-sm text-gray-400 hover:text-error"
                onClick={TaskDelete}
              >
                <Delete style={{ fontSize: '20px' }} />
                削除
              </button>
            </nav>
          </div>
          <p className={`${currentTask?.testFormat ? '' : 'hidden'} border-l-2 border-l-info pl-2`}>
            テスト形式：{currentTask?.testFormat}
          </p>
          <p className={`${currentTask?.date ? '' : 'hidden'} border-l-2 border-l-info pl-2`}>
            実践日時：{currentTask?.date}
          </p>
          <p className={`${currentTask?.limitDate ? '' : 'hidden'} border-l-2 border-l-info pl-2`}>
            期限：{currentTask?.limitDate}
          </p>
        </div>
      ) : (
        <div className="mt-3 flex w-full flex-col gap-1 rounded-md border-2 p-2">
          <h3
            className={`flex h-8 items-center gap-2 border-l-2 border-l-orange-500 pl-2 ${selectPost?.completed ? 'block' : 'hidden'}`}
          >
            <span className="text-orange-500">
              <Verified className="text-orange-500" />
            </span>
            <span className="text-orange-500">内定・参加確定</span>
          </h3>
          <h3
            className={`flex h-8 items-center gap-2 border-l-2 border-l-info pl-2 text-info ${selectPost?.completed ? 'hidden' : 'block'}`}
          >
            <span className="mr-3">タスクなし</span>
          </h3>
        </div>
      )}
    </div>
  )
}

export default TaskFLow
