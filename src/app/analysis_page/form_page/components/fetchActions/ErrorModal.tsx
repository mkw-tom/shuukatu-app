'use client'
import { signOut } from 'next-auth/react'

const ErrorModal = () => {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 ">
      <div className="mx-auto flex h-full w-11/12 flex-col items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl dark:bg-gray-700">
          <div className="card-body">
            <h2 className="card-title">AIの診断に失敗しました</h2>
            <p>ログアウトしてもう一度お試しください</p>
            <div className="card-actions justify-end">
              <button className="btn btn-outline btn-error" onClick={handleSignOut}>
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorModal
