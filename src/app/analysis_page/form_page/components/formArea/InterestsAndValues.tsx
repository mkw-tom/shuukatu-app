'use client'
import { valesArray } from '@/app/analysis_page/selectOption'
import useAnalysisForm from '../../Hooks/useAnalysisForm'

const InterestsAndValues = () => {
  const { checkValuesSave, handleAddValue, valueList, addValue, handleChangeInput, inputState } =
    useAnalysisForm()
  return (
    <>
      <div className="flex w-full flex-col gap-3 border-b-2 py-1 lg:flex-row ">
        <label
          htmlFor=""
          className="flex w-full flex-col sm:items-start lg:flex-row lg:items-center"
        >
          <span className=" inline-block w-72 px-2">5. 興味のある分野</span>
          <div className="flex w-full items-center">
            <input
              type="text"
              placeholder="業界や業種、学問、芸術など"
              className="input input-bordered input-info w-80 max-w-xs dark:bg-gray-600"
              name="interests"
              value={inputState.interests}
              onChange={(e) => handleChangeInput(e)}
              // onKeyDown={(e) => handleAddValue('interests', e)}
            />
            <button
              className="btn btn-square btn-info text-white"
              type="button"
              onClick={() => addValue('interests')}
            >
              追加
            </button>
          </div>
        </label>
        {valueList('interests')}
      </div>

      <div className="flex w-full flex-col gap-3 border-b-2 py-1 lg:flex-row ">
        <label
          htmlFor="my_modal_6"
          className="flex w-full flex-col sm:items-start lg:flex-row lg:items-center"
        >
          <span className=" inline-block w-52 px-2">6. 大事にしている価値観</span>
          <label
            htmlFor="my_modal_6"
            className="btn btn-info w-80 border-info bg-inherit text-info hover:bg-inherit"
          >
            項目をチェック
          </label>
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box dark:bg-gray-500 ">
              {valesArray?.map((value, index) => (
                <label key={index} htmlFor="" className="label cursor-pointer">
                  <span className="label-text dark:text-base-200">{value.text}</span>
                  <input
                    type="checkbox"
                    value={value.value}
                    className="checkbox-info checkbox mr-1"
                    onChange={(e) => checkValuesSave('values', e)}
                  />
                </label>
              ))}
            </div>
          </div>
        </label>
        {valueList('values')}
      </div>
    </>
  )
}

export default InterestsAndValues
