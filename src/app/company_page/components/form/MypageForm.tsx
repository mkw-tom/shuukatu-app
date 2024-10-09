import { usePostReducer } from '@/app/company_page/context/useFormInputReducer'
import { usePost } from '@/app/company_page/context/usePost'
import { mypageFormValidationSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddCircle } from '@mui/icons-material'
import { useEffect, type ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import useAddEditMypage from '../../hooks/formHooks/useAddEditMypage'

export interface MypageFormValidType {
  url: string
  id: string
  password: string
}

const MypageForm = ({
  setOpen,
  title,
  // setFormSlide,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  // setFormSlide: Dispatch<SetStateAction<string>>
}) => {
  const { postsState, postsDispatch, selectPost, setSelectPost } = usePost()
  const { state, dispatch, formSlide, setFormSlide } = usePostReducer()
  const { handleAddEditMypage, handleSkipAndCancel } = useAddEditMypage(title, setOpen)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MypageFormValidType>({
    resolver: zodResolver(mypageFormValidationSchema),
    defaultValues: {
      url: '',
      id: '',
      password: '',
    },
  })

  useEffect(() => {
    if (title === '編集') {
      reset({
        url: state.mypage.url,
        id: state.mypage.id,
        password: state.mypage.password,
      })
    }
  }, [reset, state.mypage.id, state.mypage.password, state.mypage.url, title])

  const handleStateChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    dispatch({ type: 'SET_MYPAGE', payload: { name, value } })
  }

  return (
    <div className="card mx-auto h-auto w-80 bg-white dark:bg-gray-700 sm:w-96">
      <h2 className="mx-auto mb-10 flex w-full items-center justify-center gap-1 rounded-t-lg border-b-2 border-info py-2 text-xl  text-info ">
        <AddCircle />
        <span>マイページの{title}</span>
      </h2>
      <form
        method="post"
        className="flex w-full flex-col items-start gap-8 px-5"
        onSubmit={handleSubmit(handleAddEditMypage)}
      >
        <label htmlFor="url" className="">
          <span className="sm:text-md inline-block w-[70px] text-center text-sm text-info sm:w-[100px]">
            マイページURL
          </span>
          <input
            {...register('url')}
            type="text"
            id="url"
            name="url"
            placeholder="URL："
            className="input input-sm input-bordered w-[200px] bg-gray-200 text-gray-700 sm:input-md dark:bg-gray-400 sm:w-[230px]"
            value={state.mypage.url}
            onChange={(e) => handleStateChange(e)}
          />
        </label>
        {errors.url && <span className="mx-auto text-sm text-red-500">{errors.url.message}</span>}

        <label htmlFor="id">
          <span className="sm:text-md inline-block w-[70px] text-center text-sm text-info sm:w-[100px]">
            ID
          </span>
          <input
            {...register('id')}
            id="id"
            name="id"
            type="text"
            placeholder="ID："
            className="input input-sm input-bordered w-[200px] bg-gray-200 text-gray-700 sm:input-md dark:bg-gray-400 sm:w-[230px] "
            value={state.mypage.id}
            onChange={(e) => handleStateChange(e)}
          />
        </label>
        {errors.id && <span className="mx-auto text-sm text-red-500">{errors.id.message}</span>}

        <label htmlFor="password">
          <span className="sm:text-md inline-block w-[70px] text-center text-sm text-info sm:w-[100px]">
            Password
          </span>
          <input
            {...register('password')}
            id="password"
            name="password"
            type="text"
            placeholder="開催地："
            className="input input-sm input-bordered w-[200px] bg-gray-200 text-gray-700 sm:input-md dark:bg-gray-400 sm:w-[230px] "
            value={state.mypage.password}
            onChange={(e) => handleStateChange(e)}
          />
        </label>
        {errors.password && (
          <span className="mx-auto text-sm text-red-500">{errors.password.message}</span>
        )}

        <div className="mx-auto my-5 flex w-full justify-center gap-3">
          <button
            className="btn w-1/2 bg-gray-400 text-gray-200 dark:btn-outline hover:border-gray-400 hover:bg-gray-400 dark:text-gray-400 dark:hover:bg-gray-400"
            type="button"
            onClick={() => handleSkipAndCancel()}
          >
            <span>スキップ</span>
          </button>
          <button
            className="btn w-1/2 bg-info text-gray-200 dark:btn-outline hover:border-info hover:bg-info dark:text-info dark:hover:bg-info"
            type="submit"
            // onClick={() => handleAddEditMypage()}
          >
            <span>{title}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default MypageForm
