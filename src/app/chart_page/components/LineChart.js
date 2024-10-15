'use client' // これで1つのファイル内でReactのクライアントサイドレンダリングを有効化

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Chart.jsの各要素を登録
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const LineChart = ({ data }) => {
  // グラフのオプション
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // 凡例の表示
      },
      title: {
        display: true,
        text: '月別の応募企業数',
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Y軸の開始位置を0にする
      },
    },
  }

  return <Line data={data} options={options} />
}

export default LineChart
