import { usePost } from '../context/usePost'

const useTaskSwitch = () => {
  const { currentTask, postsDispatch, selectPost, setSelectPost, prevTask } = usePost()
  const url = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DEV_API_URL

  /// 🐮🐮🐮🐮🐮🐮🐮ーーーー-------apiのfetchとstateの更新をする関数--------------------🐮🐮🐮🐮🐮🐮🐮🐮
  const taskSwitchFunc = async (updatedData: TaskType[]) => {
    try {
      const res = await fetch(`${url}/api/posts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customId: selectPost?.customId,
          taskFlow: updatedData,
        }),
      })

      setSelectPost((prev) => {
        if (!prev) return null

        return {
          ...prev,
          taskFlow: updatedData ?? [], // undefinedの場合に空の配列を設定
        }
      })

      postsDispatch({
        type: 'SWITCH_TASK',
        postId: selectPost?.customId as string,
        switchedData: updatedData,
      })
    } catch (error) {
      console.log(`faild fetch: ${error}`)
    }
  }

  ///🐯🐯🐯🐯----------------　完了ボタン-----------------------🐯🐯🐯🐯🐯🐯
  const handleFinished = async () => {
    const updateTaskFlow = selectPost?.taskFlow?.map((task, index) => {
      if (task.customId === currentTask?.customId) {
        return {
          ...task,
          current: false,
          finished: true,
        }
      }
      return task
    }) as TaskType[]

    await taskSwitchFunc(updateTaskFlow)
  }

  ///🐯🐯🐯🐯----------------　次へボタン　-----------------------🐯🐯🐯🐯🐯🐯
  const handleNext = async () => {
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

    await taskSwitchFunc(updateTaskFlow)
  }

  ///🐯🐯🐯🐯----------------　戻るボタン-----------------------🐯🐯🐯🐯🐯🐯
  const handleBack = async () => {
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

    await taskSwitchFunc(updateTaskFlow)
  }

  ///🐯🐯🐯🐯🐯ーーーー〜〜ー内定・参加確定ボタンーーーーーーーーーーー〜〜ー🐯🐯🐯🐯🐯🐯
  const handleCompleted = async () => {
    if (!selectPost?.customId) {
      console.error('customId is undefined.')
      return
    }

    const isCompleted = selectPost.completed

    try {
      const res = await fetch(`${url}/api/posts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customId: selectPost?.customId,
          completed: isCompleted ? false : true,
        }),
      })

      const updateTasks = selectPost?.taskFlow?.map((task) => {
        if (task.customId === prevTask?.customId) {
          return {
            ...task,
            finished: isCompleted ? false : true,
          }
        }
        return task
      })

      setSelectPost((prev) => {
        if (!prev) return null

        return {
          ...prev,
          completed: isCompleted ? false : true,
          task: updateTasks,
        }
      })

      const completedData = {
        ...selectPost,
        completed: isCompleted ? false : true,
        task: updateTasks,
      }

      postsDispatch({
        type: 'UPDATE_POST',
        postId: selectPost.customId,
        updatedPost: completedData,
      })
    } catch (error) {
      console.log(`faild fetch: ${error}`)
    }
  }

  return { handleFinished, handleNext, handleBack, handleCompleted }
}

export default useTaskSwitch
