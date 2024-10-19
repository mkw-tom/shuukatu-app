'use client'
import useAnalysisForm from '../../Hooks/useAnalysisForm'
import ErrorModal from './ErrorModal'
import Loading from './Loading'
import SuccessModal from './SuccessModal'

const FormAction = () => {
  const { error, success, loading, handleAnalyze } = useAnalysisForm()
  return (
    <div className="mt-5 flex w-full items-center">
      {loading && <Loading />}
      {success && <SuccessModal />}
      {error && <ErrorModal />}
      <button
        className="btn mx-auto w-11/12 bg-gradient-to-tr from-info to-orange-500 md:w-5/12"
        onClick={handleAnalyze}
      >
        診断する
      </button>
    </div>
  )
}

export default FormAction
