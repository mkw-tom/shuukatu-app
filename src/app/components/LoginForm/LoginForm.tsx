import { Email, GitHub, Google } from '@mui/icons-material'
import { signIn } from 'next-auth/react'
import type { Dispatch, SetStateAction } from 'react'
import { useRef, useState } from 'react'

const LoginForm = ({
  formOpen,
  setFormOpen,
}: {
  formOpen: boolean
  setFormOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  // const [email, setEmail] = useState<string>('')
  const emaillRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const GitHubSignIn = async () => {
    const result = await signIn('github', { redirect: false })
    if (result?.error) {
      console.error('Sign in error:', result.error)
    }
  }

  const GoogleSignIn = async () => {
    const result = await signIn('google', { redirect: false })
    if (result?.error) {
      console.error('Sign in error:', result.error)
    }
  }

  const CrendentialsSignIn = async () => {
    const email = emaillRef.current?.value
    const password = passwordRef.current?.value
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })
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
            onClick={GitHubSignIn}
          >
            <GitHub />
            <span>{isLogin ? 'Login' : 'SignUp'} with GitHub</span>
          </button>
          <button
            className="btn btn-active flex gap-3 bg-gradient-to-tr  from-info to-orange-500 text-base-100 hover:opacity-70 dark:text-gray-800"
            onClick={GoogleSignIn}
          >
            <Google />
            <span>{isLogin ? 'Login' : 'SignUp'} with Google</span>
          </button>

          <div className="my-3 flex items-center">
            <hr className="grow border-gray-300" />
            <span className="mx-3 text-gray-400">
              {/* テキストの色は必要に応じて変更 */}
              or
            </span>
            <hr className="grow border-gray-300" />
          </div>

          <div className="mx-auto flex w-11/12 flex-col gap-4">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" placeholder="Email" ref={emaillRef} />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input type="password" className="grow" ref={passwordRef} />
            </label>
          </div>

          <button
            className="btn btn-active flex gap-3 bg-gradient-to-tr  from-info to-orange-500 text-base-100 hover:opacity-70 dark:text-gray-800"
            onClick={CrendentialsSignIn}
          >
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
