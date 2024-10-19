'use client'
import { MBTiArray } from '@/app/analysis_page/selectOption'
import useAnalysisForm from '../../Hooks/useAnalysisForm'

const MBTIandSkills = () => {
  const { selectMBTI, handleAddValue, valueList, handleChangeInput, inputState, addValue } =
    useAnalysisForm()

  return (
    <>
      <label
        htmlFor=""
        className="flex w-full flex-col border-b-2 py-1 sm:items-start lg:flex-row lg:items-center"
      >
        <span className=" inline-block w-60 px-2 lg:block">1. MBTI</span>
        <div className="w-full md:flex">
          {/* <select
            className="select select-info w-10/12 sm:w-full max-w-xs dark:bg-gray-600"
            name="mbti"
            value={inputState.mbti}
            onChange={(e) => handleChangeInput(e)}
          > */}
          <select
            className="select select-info w-full max-w-xs dark:bg-gray-600"
            // value={inputState.mbti}
            onChange={(e) => selectMBTI(e.target.value)}
          >
            <option disabled>-- MBTIタイプを選択 --</option>
            {MBTiArray.map((mbti, index) => (
              <option key={index} value={mbti.value}>
                {mbti.text}
              </option>
            ))}
          </select>
          {/* <button className="btn btn-square btn-info text-white" type='button' onClick={selectMBTI}>追加</button> */}
        </div>
      </label>

      <div className="flex w-full flex-col gap-3 border-b-2 py-1 lg:flex-row ">
        <label
          htmlFor=""
          className="flex w-full flex-col sm:items-start lg:flex-row lg:items-center"
        >
          <span className=" inline-block w-72 px-2">2. スキル・特技</span>
          {/* <input
            type="text"
            name="skills"
            placeholder="フラッシュ暗算"
            className="input input-bordered input-info w-80 max-w-xs dark:bg-gray-600"
            onKeyDown={(e) => handleAddValue('skills', e)}
          /> */}
          <div className="w-full md:flex ">
            <input
              type="text"
              name="skills"
              value={inputState.skills}
              placeholder="フラッシュ暗算"
              className="input input-bordered input-info  w-10/12 max-w-xs dark:bg-gray-600 sm:w-80"
              onChange={(e) => handleChangeInput(e)}
              // onKeyDown={(e) => handleAddValue('skills', e)}
            />
            <button
              className="btn btn-square btn-info text-white"
              type="button"
              onClick={() => addValue('skills')}
            >
              追加
            </button>
          </div>
        </label>
        {valueList('skills')}
      </div>
    </>
  )
}

export default MBTIandSkills
