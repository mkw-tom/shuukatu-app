'use client'
import { useAnalysis } from '@/app/state/context/useAnalysisData'
import { Troubleshoot } from '@mui/icons-material'

const CommonPoint = () => {
  const { Analysis } = useAnalysis()
  const CommonPoint = Analysis?.commonPoints.slice(0, Analysis.commonPoints.length - 1)
  return (
    <section className="flex w-full flex-col items-start dark:text-gray-700">
      <h3 className="text-lgmd:text-xl mb-3 flex items-center font-bold">
        <Troubleshoot style={{ fontSize: '25px' }} />
        <span>これら職業の共通特徴</span>
      </h3>
      <ul className="text-lgmd:text-xl ml-12 flex w-auto list-disc flex-col gap-2">
        {CommonPoint?.map((value, index) => <li key={index}>{value}</li>)}
      </ul>
    </section>
  )
}

export default CommonPoint
