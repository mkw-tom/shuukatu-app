'use client'
import { usePost } from '@/app/state/context/usePost'
import { Insights } from '@mui/icons-material'
import LineChart from './LineChart'

const MonthLineChart = () => {
  const { postsState } = usePost()

  // ------------ Array[ Number[], Number[] ]
  const getMonthEventData = () => {
    const monthData = postsState.map((post) => {
      const month = new Date(post.startDate).getMonth() + 1
      return month
    })
    const array = []
    for (let i = 1; i <= 12; i++) {
      let count = 0
      const data = monthData.map((num) => {
        if (i === num) {
          count++
        }
        return count
      })
      array.push(data)
    }
    return array
  }
  const arrray = getMonthEventData()

  // -------------- number[] --------------
  const MonthEventArray = arrray.map((data) => {
    const length = data.filter((num) => num !== 0)
    return length.length
  })

  const data = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    datasets: [
      {
        label: '応募企業数',
        data: MonthEventArray, // 各月のデータ
        borderColor: 'rgba(14, 165, 233, 1)', // 線の色
        backgroundColor: 'rgba(14, 165, 233, 0.2)', // 塗りつぶしの色
        fill: true, // 線の下を塗りつぶすかどうか
        tension: 0.4, // 線のカーブ具合
      },
    ],
  }

  return (
    <div className="mx-auto mt-16 rounded-md py-5 dark:bg-base-300 md:mt-32 md:w-9/12 md:p-5">
      <h3 className="flex items-center gap-1 pb-1 text-lg font-bold text-info md:text-2xl ">
        <Insights style={{ fontSize: '25px' }} />
        <span>月別の応募総数</span>
      </h3>
      <LineChart data={data} />
    </div>
  )
}

export default MonthLineChart
