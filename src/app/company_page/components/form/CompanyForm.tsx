import { usePostReducer } from '@/app/company_page/context/useFormInputReducer'
import { usePost } from '@/app/company_page/context/usePost'
import { companyFormValidatioinSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddCircle } from '@mui/icons-material'
import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import useAddEditCompanyData from '../../hooks/formHooks/useAddEditCompanyData'

export interface CompanyFormValidateType {
  name: string
  event: string
  startDate: string
  endDate: string
  region: string
}

const CompanyForm = ({
  setOpen,
  title,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
}) => {
  const { selectPost, setSelectPost, postsDispatch } = usePost()
  const { state, dispatch, formSlide, setFormSlide } = usePostReducer()

  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [selectEvent, setSelectEvent] = useState<boolean>(false)
  const {
    register,
    trigger,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompanyFormValidateType>({ resolver: zodResolver(companyFormValidatioinSchema) })

  const { handleAddEdtCompanyData, handleCancel } = useAddEditCompanyData(title, setOpen)

  // const handleSaveAndValidate = () => {

  //   handleAddEdtCompanyData
  // }

  useEffect(() => {
    if (title === '編集') {
      setStartDate(state.startDate)
      setEndDate(state.endDate)
    }
  }, [state.startDate, state.endDate, title])

  const handleStateChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const customId = title === '編集' ? (selectPost?.customId as string) : uuidv4()
    const userId = 'aiueo'

    const { name, value } = e.target
    dispatch({
      type: 'SET_COMPANY',
      payload: { customId, userId, startDate, endDate, name, value },
    })
  }

  return (
    <div className="card mx-auto h-auto w-96 bg-white dark:bg-gray-700">
      <h2 className="mx-auto mb-10 flex w-full items-center justify-center gap-1 rounded-t-lg border-b-2 border-info py-2 text-xl  text-info dark:bg-info dark:text-gray-900 ">
        <AddCircle />
        <span>企業の{title}</span>
      </h2>
      <form
        method="post"
        className="flex w-full flex-col items-start gap-8 px-5"
        onSubmit={handleSubmit(handleAddEdtCompanyData)}
      >
        <label htmlFor="name" className="">
          <span className="inline-block w-[100px] text-center text-info">企業名</span>
          <input
            {...register('name')}
            type="text"
            id="name"
            name="name"
            placeholder="企業名："
            className="input input-bordered w-[230px] bg-gray-200 text-gray-700 dark:bg-gray-400"
            value={state.name}
            onChange={(e) => handleStateChange(e)}
          />
        </label>
        {errors.name && (
          <span className="mx-auto text-center text-sm text-red-500">{errors.name.message}</span>
        )}
        <label htmlFor="event">
          <span className="group inline-block w-[100px] text-center text-info">イベント</span>
          <select
            {...register('event')}
            id="event"
            name="event"
            className="select select-bordered w-[230px] bg-gray-200 text-gray-700 dark:bg-gray-400"
            value={state.event}
            onChange={(e) => handleStateChange(e)}
            onClick={() => setSelectEvent(true)}
          >
            <option disabled={selectEvent ? true : false}>イベントの選択</option>
            <option onClick={() => setSelectEvent(false)}>本選考</option>
            <option onClick={() => setSelectEvent(false)}>短期インターン</option>
            <option onClick={() => setSelectEvent(false)}>長期インターン</option>
            <option onClick={() => setSelectEvent(false)}>ハッカソン</option>
          </select>
        </label>
        {errors.event && (
          <span className="mx-auto text-sm text-red-500">{errors.event.message}</span>
        )}

        <div className="flex w-full items-center">
          <span className="inline-block w-[100px] text-center text-info">開催日時</span>
          <div className="flex w-[230px] flex-col items-center gap-2">
            <input
              {...register('startDate')}
              type="datetime-local"
              className="input  input-bordered w-full bg-gray-200 text-gray-700 dark:bg-gray-400"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {errors.endDate && (
              <span className="text-sm text-red-500">{errors.endDate.message}</span>
            )}

            <p>から</p>
            <input
              {...register('endDate')}
              type="datetime-local"
              className="input input-bordered w-full  bg-gray-200 text-gray-700 dark:bg-gray-400"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {errors.startDate && (
              <span className="text-sm text-red-500">{errors.startDate.message}</span>
            )}
          </div>
        </div>

        <label htmlFor="region">
          <span className="inline-block w-[100px] text-center text-info">開催地</span>
          <input
            {...register('region')}
            id="region"
            name="region"
            type="text"
            placeholder="開催地："
            className="input input-bordered w-[230px] bg-gray-200 text-gray-700 dark:bg-gray-400 "
            value={state.region}
            onChange={(e) => handleStateChange(e)}
          />
        </label>
        {errors.region && (
          <span className="mx-auto text-sm text-red-500">{errors.region.message}</span>
        )}

        <div className="mx-auto my-5 flex gap-3">
          <button
            className="btn w-40 bg-gray-400 text-gray-200 dark:btn-outline hover:border-gray-400 hover:bg-gray-400 dark:text-gray-400 dark:hover:bg-gray-400"
            type="button"
            onClick={() => handleCancel()}
          >
            <span>キャンセル</span>
          </button>
          <button
            className="btn w-40 bg-info text-gray-200 dark:btn-outline hover:border-info hover:bg-info dark:text-info dark:hover:bg-info"
            type="submit"
            // onClick={handleAddEdtCompanyData}
          >
            <span>{title}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default CompanyForm
