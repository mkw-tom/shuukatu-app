import { useRouter } from 'next/navigation'
import type { Dispatch, SetStateAction } from 'react'
import { usePostReducer } from '../../context/useFormInputReducer'
import { usePost } from '../../context/usePost'

export const useAddEdutTask = (
  title: string,
  setOpen: Dispatch<SetStateAction<boolean>>,
  onlyTaskForm: boolean,
  date: string,
  limitDate: string,
) => {
  const { state, dispatch, formSlide, setFormSlide } = usePostReducer()
  const { setPosts, posts, selectPost, setSelectPost, selectTask, postsDispatch } = usePost()
  const router = useRouter()

  const url = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DEV_API_URL

  // --------------タスク追加ーーーーーーーーーーー-
  const handleAddTask = async () => {
    const res = await fetch(`${url}/api/task`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // JSONデータを送ることを明示
      },
      body: JSON.stringify({
        customId: state.customId || selectPost?.customId,
        taskFlow: {
          ...state.taskFlow,
          date,
          limitDate,
        },
      }),
    })

    if (!res.ok) {
      console.log('failed to fetch')
    }

    postsDispatch({
      type: 'ADD_TASK',
      postId: (state?.customId as string) || (selectPost?.customId as string),
      newTask: { ...state.taskFlow, date, limitDate },
    })

    setSelectPost((prev) => {
      if (!prev) return null

      return {
        ...prev,
        taskFlow: [...(prev.taskFlow || []), state.taskFlow],
        customId: prev.customId || '',
        userId: prev.userId || '',
        name: prev.name || '',
        event: prev.event || '',
        startDate: prev.startDate || '',
        endDate: prev.endDate || '',
        region: prev.region || '',
        completed: prev.completed ?? false,
        failed: prev.failed ?? false,
        mypage: {
          ...prev.mypage,
          url: prev.mypage?.url || '',
          id: prev.mypage?.id || '',
          password: prev.mypage?.password || '',
        },
      }
    })

    setFormSlide('-translate-x-none')
    setOpen(false)

    dispatch({ type: 'CLEAR' })

    if (onlyTaskForm === false) {
      ///企業データ追加時
      router.refresh()
    }
  }

  ///ーーーーーーーーーーーータスク編集ーーーーーーーーーーーーーーーーーーー
  const hadleEditTask = async () => {
    const taskId = selectTask?.customId

    try {
      const res = await fetch(`${url}/api/task/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // JSONデータを送ることを明示
        },
        body: JSON.stringify({
          postId: selectPost?.customId,
          // taskId: selectTask?.customId,
          updateData: {
            ...state.taskFlow,
            postId: selectTask?.customId as string,
            taskId: selectTask?.customId as string,
            date,
            limitDate,
          },
        }),
      })

      if (res.ok!) {
        console.log('failed fetch')
      }

      setFormSlide('-translate-x-none')
      setOpen(false)

      postsDispatch({
        type: 'UPDATE_TASK',
        postId: selectTask?.customId as string,
        taskId: selectTask?.customId as string,
        updateTask: {
          ...state.taskFlow,
          date,
          limitDate,
        },
      })

      setSelectPost((prev) => {
        if (!prev) return null

        return {
          ...prev,
          taskFlow: prev.taskFlow.map((task) =>
            task.customId === selectTask?.customId ? state.taskFlow : task,
          ),
        }
      })

      dispatch({ type: 'CLEAR' })
      setOpen(false)

      // router.refresh()
    } catch (error) {
      alert(`faild fetch : ${error}`)
    }
  }

  //🐯🐯🐯🐯🐯-----------------タスクの追加・編集をまとめた関数 -------------------------------------🐯🐯🐯🐯

  const handleAddEditTask = () => {
    if (title === '編集') {
      ///タスク編集時
      return hadleEditTask()
    }
    ///タスク追加時
    return handleAddTask()
  }

  ///🐯🐯🐯🐯-------------フォームキャンセル-------------------------------------------🐯🐯🐯🐯
  const handleCancel = () => {
    setFormSlide('-translate-x-none')
    dispatch({ type: 'CLEAR' })
    setOpen(false)
  }

  return { handleAddEditTask, handleCancel }
}

export default useAddEdutTask
