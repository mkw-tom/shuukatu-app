import type { Dispatch, SetStateAction } from 'react'
import { usePostReducer } from '../../context/useFormInputReducer'
import { usePost } from '../../context/usePost'

const useAddEditMypage = (title: string, setOpen: Dispatch<SetStateAction<boolean>>) => {
  const { postsState, postsDispatch, selectPost, setSelectPost } = usePost()
  const { state, dispatch, formSlide, setFormSlide } = usePostReducer()

  ///🐯🐯🐯🐯　ーーーーーーーーーー〜　マイページの追加・編集の関数　ーーーーーーーーーーーーーーーーーーーー〜〜ー🐯🐯🐯🐯🐯🐯
  const handleAddEditMypage = async () => {
    // const userId = '66b80f4baa71df7091ecaaa3'
    const url = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DEV_API_URL
    try {
      const res = await fetch(`${url}/api/posts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // JSONデータを送ることを明示
        },
        body: JSON.stringify({
          customId: state.customId,
          mypage: state.mypage,
        }),
      })

      ///-------　フォーム入力用のstateを加工　ーーーーーーーーー
      const { taskFlow, ...postData } = state
      const updatedData = { ...postData, taskFlow: [] as TaskType[] }

      postsDispatch({ type: 'UPDATE_POST', postId: state.customId, updatedPost: updatedData })

      console.log(state)

      if (title === '編集') {
        setSelectPost(updatedData)
        setOpen(false)
        setFormSlide('-translate-x-none')
        dispatch({ type: 'CLEAR' })
      } else {
        setSelectPost(updatedData)
        setFormSlide('-translate-x-[640px] sm:-translate-x-[768px]')
      }
    } catch (error) {
      console.log(`faild fetch : ${error}`)
    }
  }

  //🐯🐯🐯🐯🐯 -----フォームキャンセルーーーーーーーーーーーーーーーーーーーーーーーーーー🐯🐯🐯🐯🐯
  const handleSkipAndCancel = () => {
    if (title === '編集') {
      setOpen(false)
      dispatch({ type: 'CLEAR' })
      setFormSlide('-translate-x-none')
    } else {
      setFormSlide('-translate-x-[640px]  sm:-translate-x-[768px]')
    }
  }

  return { handleAddEditMypage, handleSkipAndCancel }
}

export default useAddEditMypage
