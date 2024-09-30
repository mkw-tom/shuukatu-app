import { Email, GitHub, Google } from '@mui/icons-material'
import { signIn } from 'next-auth/react'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

const LoginForm = ({
  formOpen,
  setFormOpen,
}: {
  formOpen: boolean
  setFormOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const handleSignIn = async () => {
    const result = await signIn('github', { redirect: false })
    if (result?.error) {
      console.error('Sign in error:', result.error)
    }
  }

  const closeForm = () => {
    setFormOpen(false)
  }

  return (
    <div className={`${formOpen ? 'fixed' : 'hidden'} inset-0 z-50 bg-black`}>
      <div className="card mx-auto mb-6 mt-40 h-auto w-[450px] overflow-hidden bg-base-100 px-5 pt-8 dark:bg-gray-800 sm:w-[500px]">
        <div className="mx-auto flex w-80">
          <button
            className={`w-1/2 border-b-4 font-bold text-info ${isLogin ? 'border-b-base-100 dark:border-b-gray-800' : 'border-b-info'}`}
            onClick={() => setIsLogin(false)}
          >
            新規登録
          </button>
          <button
            className={`w-1/2 border-b-4 font-bold text-info ${isLogin ? ' border-b-info' : 'border-b-base-100 dark:border-b-gray-800'} `}
            onClick={() => setIsLogin(true)}
          >
            ログイン
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          <button
            className="btn btn-active flex gap-3 bg-gradient-to-tr  from-info to-orange-500 text-base-100 hover:opacity-70 dark:text-gray-800"
            onClick={handleSignIn}
          >
            <GitHub />
            <span>{isLogin ? 'Login' : 'SignUp'} with GitHub</span>
          </button>
          <button className="btn btn-active flex gap-3 bg-gradient-to-tr  from-info to-orange-500 text-base-100 hover:opacity-70 dark:text-gray-800">
            <Google />
            <span>{isLogin ? 'Login' : 'SignUp'} with Google</span>
          </button>
          <button className="btn btn-active flex gap-3 bg-gradient-to-tr  from-info to-orange-500 text-base-100 hover:opacity-70 dark:text-gray-800">
            <Email />
            <span>{isLogin ? 'Login' : 'SignUp'}with Email</span>
          </button>
        </div>

        <button
          className="btn btn-link btn-sm mb-3 mt-10 text-gray-500 transition duration-150 hover:bg-base-200 dark:hover:bg-gray-700"
          onClick={closeForm}
        >
          CLOSE
        </button>
      </div>
    </div>
  )
}

export default LoginForm
