import type { Dispatch, SetStateAction } from 'react'
import { usePostReducer } from '../../../state/context/useFormInputReducer'
import { usePost } from '../../../state/context/usePost'

export const useAddEditCompanyData = (
  title: string,
  setOpen: Dispatch<SetStateAction<boolean>>,
  startDate: string,
  setStartDate: Dispatch<SetStateAction<string>>,
  endDate: string,
  setEndDate: Dispatch<SetStateAction<string>>,
) => {
  const { selectPost, setSelectPost, postsDispatch } = usePost()
  const { state, dispatch, formSlide, setFormSlide } = usePostReducer()
  const url = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DEV_API_URL

  ///--------- 企業データの追加 ----------------
  const AddCompanyData = async () => {
    const res = await fetch(`${url}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // JSONデータを送ることを明示
      },
      body: JSON.stringify({
        customId: state.customId,
        userId: state.userId,
        name: state.name,
        event: state.event,
        startDate,
        endDate,
        region: state.region,
      }),
    })

    ///-------　フォーム入力用の　state　を加工　ーーーーーーーーー
    const { taskFlow, ...postData } = state
    const addData = { ...postData, taskFlow: [] as TaskType[] }

    postsDispatch({ type: 'ADD_POST', post: addData })

    setStartDate('')
    setEndDate('')
    console.log(state)
    setFormSlide('-translate-x-80 sm:-translate-x-96')
  }

  ///----------- 企業データの編集 -----------------------
  const EditCompanyData = async () => {
    try {
      const res = await fetch(`${url}/api/posts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // JSONデータを送ることを明示
        },
        body: JSON.stringify({
          customId: state.customId,
          name: state.name,
          event: state.event,
          startDate: state.startDate,
          endDate: state.endDate,
          region: state.region,
        }),
      })

      const { taskFlow, ...postFormData } = state
      const updatedData = { ...postFormData, taskFlow: selectPost?.taskFlow as TaskType[] }

      postsDispatch({
        type: 'UPDATE_POST',
        postId: selectPost?.customId as string,
        updatedPost: {
          ...updatedData,
        },
      })

      setSelectPost(updatedData)
      setStartDate('')
      setEndDate('')
      setFormSlide('-translate-x-80 sm:-translate-x-96')
    } catch (error) {
      console.log(`faild fetch : ${error}`)
    }
  }

  ///🐯🐯🐯🐯　追加と編集を一つにまとめた関数 ----------------------------🐯🐯🐯🐯🐯
  const handleAddEdtCompanyData = () => {
    if (title === '編集') {
      return EditCompanyData()
    }

    return AddCompanyData()
  }

  ///🐯🐯🐯🐯 フォームキャンセル ------------------------------🐯🐯🐯🐯
  const handleCancel = () => {
    // e.preventDefault()
    dispatch({ type: 'CLEAR' })
    setFormSlide('-translate-x-none')
    setOpen(false)
  }

  return { handleAddEdtCompanyData, handleCancel }
}

export default useAddEditCompanyData
