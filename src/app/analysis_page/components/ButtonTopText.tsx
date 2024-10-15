import { useAnalysis } from '@/app/state/context/useAnalysisData'

const ButtonTopText = () => {
  const { Analysis } = useAnalysis()
  return (
    <>
      {Analysis ? (
        <p className="mt-10 w-full text-center text-lg font-bold md:text-2xl">
          ↓↓ 診断結果を見る ↓↓
        </p>
      ) : (
        <p className="mt-10 w-full text-center text-lg font-bold md:text-2xl">
          ↓↓ 5分でサクッと診断 ↓↓
        </p>
      )}
    </>
  )
}

export default ButtonTopText
