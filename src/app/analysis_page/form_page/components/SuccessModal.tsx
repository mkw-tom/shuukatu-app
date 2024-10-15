import Link from 'next/link'

const SuccessModal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 ">
      <div className="mx-auto flex h-full w-11/12 flex-col items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl dark:bg-gray-700">
          <div className="card-body">
            <h2 className="card-title">AIの診断が終了しました！</h2>
            <p>あなたの適職と能力スコアの診断結果がご覧いただけます。</p>
            <div className="card-actions justify-end">
              <Link href="/analysis_page/result_page">
                <button className="btn btn-outline btn-info">結果を見る</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
