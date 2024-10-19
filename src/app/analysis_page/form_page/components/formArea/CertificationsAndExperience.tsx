'use client'
import useAnalysisForm from '../../Hooks/useAnalysisForm'

const CertificationsAndExperience = () => {
  const { handleAddValue, valueList, addValue, handleChangeInput, inputState } = useAnalysisForm()
  return (
    <>
      <div className="flex w-full flex-col gap-3 border-b-2 py-1 lg:flex-row ">
        <label
          htmlFor=""
          className="flex w-full flex-col sm:items-start lg:flex-row lg:items-center"
        >
          <span className=" inline-block w-72 px-2">3. 取得資格</span>
          <div className="w-full md:flex">
            <input
              className="input input-bordered input-info w-10/12 max-w-xs dark:bg-gray-600 sm:w-80"
              type="text"
              name="certifications"
              value={inputState.certifications}
              placeholder="日商簿記３級、ITパスポート"
              onChange={(e) => handleChangeInput(e)}
              // onKeyDown={(e) => handleAddValue('certifications', e)}
            />

            <button
              className="btn btn-square btn-info text-white"
              type="button"
              onClick={() => addValue('certifications')}
            >
              追加
            </button>
          </div>
        </label>
        {valueList('certifications')}
      </div>

      <div className="flex w-full flex-col gap-3 border-b-2 py-1 lg:flex-row ">
        <label
          htmlFor=""
          className="flex w-full flex-col sm:items-start lg:flex-row lg:items-center"
        >
          <span className=" inline-block w-72 px-2">4. 自慢できる経験</span>
          <div className="flex w-full items-start">
            <textarea
              className="textarea textarea-info w-10/12 max-w-xs dark:bg-gray-600 sm:w-80"
              placeholder="例：ゼミの研究で優勝しました"
              name="experience"
              value={inputState.experience}
              onChange={(e) => handleChangeInput(e)}
              // onKeyDown={(e) => handleAddValue('experience', e)}
            ></textarea>
            <button
              className="btn btn-square btn-info text-white"
              type="button"
              onClick={() => addValue('experience')}
            >
              追加
            </button>
          </div>
        </label>
        {valueList('experience')}
      </div>
    </>
  )
}

export default CertificationsAndExperience
