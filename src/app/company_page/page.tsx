'use client'
import CardList from './components/CardList.tsx/CardList'
import { FormInputReducerContextProvider } from './context/useFormInputReducer'

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { user } = useUser()

  // const getDatas = async () => {
  //   const userId = user?._id
  //   const url = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DEV_API_URL
  // const res = await fetch(`${url}/api/posts?userId=${userId}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   // cache: 'no-store',
  // })

  //   if (!res.ok) {
  //     return 'failed fetch'
  //   }

  //   const response = await res.json() // JSONとしてレスポンスを処理
  //   return response
  // }

  // const postsData = (await getDatas()) as PostType[]

  return (
    <main className="h-lvh ">
      <div className="mx-3 mt-10 items-start justify-between md:mx-10 lg:flex">
        <FormInputReducerContextProvider>
          {/* <PostContextProvider> */}
          {/* <UserContextPorvider> */}
          <CardList />

          {/* </UserContextPorvider> */}
          {/* <div className=" ">
              <ShowCard />
            </div> */}
          {/* </PostContextProvider> */}
        </FormInputReducerContextProvider>
      </div>
    </main>
  )
}

export default page
