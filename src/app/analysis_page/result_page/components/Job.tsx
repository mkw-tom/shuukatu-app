'use client'
import { useAnalysis } from '@/app/state/context/useAnalysisData'
import { PersonSearch } from '@mui/icons-material'

const Job = () => {
  const { Analysis } = useAnalysis()
  const jobs = Analysis?.jobProposals.slice(0, 5)

  return (
    <section className="flex w-full flex-col items-start dark:text-gray-700">
      <h3
        className="text-lgmd:text-xl mb-3 flex items-center font-bold"
        onClick={() => alert(`${Analysis}`)}
      >
        <PersonSearch style={{ fontSize: '25px' }} />
        マッチした職業
      </h3>
      <ul className="text-lgmd:text-xl ml-12 flex w-auto list-decimal flex-col gap-2">
        {jobs?.map((job, index) => <li key={index}>{job}</li>)}
      </ul>
    </section>
  )
}

export default Job
