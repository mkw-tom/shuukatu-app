'use client'
import { useAnalysis } from '@/app/state/context/useAnalysisData'
import { Psychology } from '@mui/icons-material'
import ResultChart from './ResultChart'

const Skills = () => {
  const { Analysis } = useAnalysis()
  const skillName = Analysis?.skillScores.map((data) => {
    return data.skillName
  })

  const skillScore = Analysis?.skillScores.map((data) => {
    return data.score
  })
  const data = {
    labels: skillName,
    datasets: [
      {
        label: 'あなたの能力スコア',
        data: skillScore,
        backgroundColor: ' rgba(249, 115, 22, 0.4)',
        borderColor: '#d1d5db',
        borderWidth: 1,
      },
    ],
  }

  return (
    <section className=" w-full rounded-md bg-sky-200  p-5 lg:w-1/2  ">
      <h3 className="text-md mr-1 flex items-center font-bold text-gray-700 md:text-xl ">
        <Psychology style={{ fontSize: '25px' }} />
        <span>能力スコア</span>
      </h3>

      <ResultChart data={data} />
    </section>
  )
}

export default Skills
