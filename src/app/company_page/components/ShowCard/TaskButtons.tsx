'use client'
import { Check, NextPlanOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { usePost } from '../../context/usePost'

const TaskButtons = () => {
  const { currentTask, finishedTasks, postsState, postsDispatch, selectPost, setSelectPost } =
    usePost()
  // const prevTaskIndex = finishedTasks?.length as number -1
  const prevTask = finishedTasks?.slice(-1)[0]
  const notFinishTasks = selectPost?.taskFlow?.filter((task) => task.finished === false)
  // const nextTaskIndex = finishedTasks?.length as number - 3
  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  const taskSwitchFunc = (data: TaskType[]) => {
    postsDispatch({
      type: 'SWITCH_TASK',
      postId: selectPost?.customId as string,
      switchedData: data,
    })
  }

  const handleFinished = () => {
    const updateTaskFlow = selectPost?.taskFlow?.map((task, index) => {
      if (task.customId === currentTask?.customId) {
        return {
          ...task,
          // current: true,
          current: false,
          finished: true,
        }
      }
      return task
    }) as TaskType[]

    setSelectPost((prev) => {
      if (!prev) return null
      return {
        ...prev,
        taskFlow: updateTaskFlow ?? [], // undefinedの場合に空の配列を設定
      }
    })

    taskSwitchFunc(updateTaskFlow)
  }

  const handleNext = () => {
    const updateTaskFlow = selectPost?.taskFlow?.map((task) => {
      if (task.customId === currentTask?.customId) {
        return {
          ...task,
          current: true,
        }
      }
      return {
        ...task,
        current: false,
      }
    }) as TaskType[]

    setSelectPost((prev) => {
      if (!prev) return null
      return {
        ...prev,
        taskFlow: updateTaskFlow ?? [], // undefinedの場合に空の配列を設定
      }
    })

    taskSwitchFunc(updateTaskFlow)
  }

  const handleBack = () => {
    const updateTaskFlow = selectPost?.taskFlow?.map((task, index: number) => {
      if (task.customId === currentTask?.customId) {
        return {
          ...task,
          current: false,
          finished: false,
        }
      }

      if (task.customId === prevTask?.customId) {
        return {
          ...task,
          current: true,
          finished: false,
        }
      }

      return task
    }) as TaskType[]

    setSelectPost((prev) => {
      if (!prev) return null

      return {
        ...prev,
        taskFlow: updateTaskFlow ?? [], // undefinedの場合に空の配列を設定
      }
    })

    taskSwitchFunc(updateTaskFlow)
  }
  console.log(selectPost?.completed)

  const handleCompleted = () => {
    setIsCompleted((prev) => !prev)
    if (!selectPost?.customId) {
      console.error('customId is undefined.')
      return
    }
    const updateTasks = selectPost?.taskFlow?.map((task) => {
      if (task.customId === prevTask?.customId) {
        return {
          ...task,
          finished: isCompleted,
        }
      }
      return task
    })

    setSelectPost((prev) => {
      if (!prev) return null

      return {
        ...prev,
        completed: isCompleted,
        task: updateTasks,
      }
    })

    const completedData = {
      ...selectPost,
      completed: isCompleted,
      task: updateTasks,
    }

    postsDispatch({ type: 'UPDATE_POST', postId: selectPost.customId, updatedPost: completedData })
  }

  return (
    <div className="mt-5 flex items-center justify-between gap-2 ">
      <button
        className="btn w-3/12 bg-gray-400 text-gray-200 dark:btn-outline hover:border-gray-400 hover:bg-gray-400 dark:text-gray-400 dark:hover:bg-gray-400"
        onClick={handleBack}
        disabled={prevTask === undefined || selectPost?.completed ? true : false}
      >
        戻る
      </button>
      {/* 次のタスクがない時だけ表示 */}
      {!currentTask?.current ? (
        <>
          <button
            className={`btn w-auto flex-1 ${selectPost?.completed ? 'bg-gray-400 hover:border-gray-400 hover:bg-gray-500' : 'bg-orange-500 hover:border-orange-500 hover:bg-orange-500'} text-gray-200 dark:btn-outline  dark:text-orange-500 dark:hover:bg-orange-500 ${currentTask ? 'hidden' : 'block'} `}
            onClick={() => handleCompleted()}
          >
            {selectPost?.completed ? '内定・参加取り消し' : '内定・参加確定'}
          </button>
          <button
            className={`btn w-auto flex-1 items-center bg-info text-gray-200 dark:btn-outline hover:border-info hover:bg-info dark:text-info dark:hover:bg-info ${!currentTask && prevTask?.finished ? 'hidden' : 'flex'}`}
            onClick={handleNext}
            disabled={selectPost?.completed || !currentTask ? true : false}
          >
            <NextPlanOutlined />
            <span>次へ</span>
          </button>
        </>
      ) : (
        <button
          className="btn w-auto flex-1 bg-info text-gray-200 dark:btn-outline hover:border-info hover:bg-info dark:text-info dark:hover:bg-info"
          onClick={handleFinished}
        >
          <Check />
          完了
        </button>
      )}
    </div>
  )
}

export default TaskButtons
