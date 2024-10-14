'use client'
import { MBTiArray, valesArray } from '../selectOption'
import AnalyzeButton from './components/AnalyzeButton'
import Loading from './components/Loading'
import SuccessModal from './components/SuccessModal'
import useAnalysisForm from './Hooks/useAnalysisForm'

const Page = () => {
  const {
    handleAddValue,
    checkValuesSave,
    valueList,
    selectMBTI,
    addTeamRole,
    handleAnalyze,
    loading,
    success,
  } = useAnalysisForm()
  // const { fetchAnalysisFunc, data} = useFetchAnalysis()

  return (
    <main className="h-auto dark:bg-gray-800">
      <div className="mx-5 h-full pb-48 pt-20 md:mx-10">
        <h1 className="w-full text-xl">MBTI適職診断</h1>
        <form className="bg-inf  flex size-full flex-col items-start gap-16">
          <label
            htmlFor=""
            className="flex w-full flex-col border-b-2 py-1 sm:items-start lg:flex-row lg:items-center"
          >
            <span className=" inline-block w-56 px-2">1. MBTI</span>
            <select
              className="select select-info w-full max-w-xs dark:bg-gray-600"
              onChange={(e) => selectMBTI(e.target.value)}
            >
              <option disabled>-- MBTIタイプを選択 --</option>
              {MBTiArray.map((mbti, index) => (
                <option key={index} value={mbti.value}>
                  {mbti.text}
                </option>
              ))}
            </select>
          </label>

          <div className="flex w-full flex-col gap-3 border-b-2 py-1 lg:flex-row">
            <label
              htmlFor=""
              className="flex w-full flex-col sm:items-start lg:flex-row lg:items-center"
            >
              <span className=" inline-block w-56 px-2">2. スキル・特技</span>
              <input
                type="text"
                name="skills"
                placeholder="フラッシュ暗算"
                className="input input-bordered input-info w-80 max-w-xs dark:bg-gray-600"
                onKeyDown={(e) => handleAddValue('skills', e)}
              />
            </label>
            {valueList('skills')}
          </div>

          <div className="flex w-full flex-col gap-3 border-b-2 py-1 lg:flex-row ">
            <label
              htmlFor=""
              className="flex w-full flex-col sm:items-start lg:flex-row lg:items-center"
            >
              <span className=" inline-block w-56 px-2">3. 取得資格</span>
              <input
                type="text"
                placeholder="日商簿記３級、ITパスポート"
                className="input input-bordered input-info w-80 max-w-xs dark:bg-gray-600"
                onKeyDown={(e) => handleAddValue('certifications', e)}
              />
            </label>
            {valueList('certifications')}
          </div>

          <div className="flex w-full flex-col gap-3 border-b-2 py-1 lg:flex-row ">
            <label
              htmlFor=""
              className="flex w-full flex-col sm:items-start lg:flex-row lg:items-center"
            >
              <span className=" inline-block w-56 px-2">4. 自慢できる経験</span>
              <textarea
                className="textarea textarea-info dark:bg-gray-600 sm:w-80"
                placeholder="例：ゼミの研究で優勝しました"
                onKeyDown={(e) => handleAddValue('experience', e)}
              ></textarea>
            </label>
            {valueList('experience')}
          </div>

          <div className="flex w-full flex-col gap-3 border-b-2 py-1 lg:flex-row ">
            <label
              htmlFor=""
              className="flex w-full flex-col sm:items-start lg:flex-row lg:items-center"
            >
              <span className=" inline-block w-56 px-2">5. 興味のある分野</span>
              <input
                type="text"
                placeholder="業界や業種、学問、芸術など"
                className="input input-bordered input-info w-80 max-w-xs dark:bg-gray-600"
                onKeyDown={(e) => handleAddValue('interests', e)}
              />
            </label>
            {valueList('interests')}
          </div>

          <div className="flex w-full flex-col gap-3 border-b-2 py-1 lg:flex-row ">
            <label
              htmlFor="my_modal_6"
              className="flex w-full flex-col sm:items-start lg:flex-row lg:items-center"
            >
              <span className=" inline-block w-56 px-2">6. 大事にしている価値観</span>
              <label
                htmlFor="my_modal_6"
                className="btn btn-info w-80 border-info bg-inherit text-info hover:bg-inherit"
              >
                項目をチェック
              </label>
              <input type="checkbox" id="my_modal_6" className="modal-toggle" />
              <div className="modal" role="dialog">
                <div className="modal-box dark:bg-gray-500">
                  {valesArray?.map((value, index) => (
                    <label key={index} htmlFor="" className="label cursor-pointer">
                      <span className="label-text">{value.text}</span>
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

          <div className="flex w-full flex-col gap-3 border-b-2 py-1 lg:flex-row ">
            <label
              htmlFor=""
              className="flex w-full flex-col sm:items-start lg:flex-row lg:items-center"
            >
              <span className=" inline-block w-56 px-2 ">7. 理想の働き方</span>
              <textarea
                className="textarea textarea-info  dark:bg-gray-600 sm:w-80"
                placeholder="例：プライベートを大事にしたい。"
                onKeyDown={(e) => handleAddValue('workStyle', e)}
                minLength={20}
              ></textarea>
            </label>
            {valueList('workStyle')}
          </div>
          <div className="flex w-full flex-col gap-3 border-b-2 py-5 lg:flex-row">
            <label
              htmlFor=""
              className="flex w-full flex-col sm:items-start lg:flex-row lg:items-center"
            >
              <span className=" inline-block w-56 px-2 ">8. グループ活動での立ち位置</span>
              <textarea
                className="textarea textarea-info h-56 dark:bg-gray-600 sm:w-80 "
                placeholder="例：リーダーシップをとることはあまりないですが、積極的にアイデアを出します。"
                // onKeyDown={(e) => handleAddValue('workStyle', e)}
                onKeyDown={(e) => addTeamRole(e)}
              ></textarea>
            </label>
          </div>
        </form>
        <div className="mt-5 flex w-full items-center">
          {loading && <Loading />}
          <SuccessModal />
          <AnalyzeButton />
        </div>
      </div>
    </main>
  )
}

export default Page
