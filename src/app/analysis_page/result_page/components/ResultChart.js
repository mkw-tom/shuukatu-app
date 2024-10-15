'use client'
import 'chart.js/auto'
import { Radar } from 'react-chartjs-2'

const ResultChart = ({ data }) => {
  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  }

  return <Radar data={data} options={options} />
}

export default ResultChart
