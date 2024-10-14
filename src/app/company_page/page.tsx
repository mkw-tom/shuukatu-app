'use client'
import { FormInputReducerContextProvider } from '../state/context/useFormInputReducer'
import CardList from './components/CardList.tsx/CardList'

const page = () => {
  return (
    <main className="h-lvh dark:bg-gray-800">
      <div className="mx-3 items-start justify-between pt-20 md:mx-10 lg:flex">
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
