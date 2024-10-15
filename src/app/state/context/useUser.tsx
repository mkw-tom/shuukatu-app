'use client'

import type { UserType } from '@/types/userType'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAnalysis } from './useAnalysisData'
import { usePost } from './usePost'

interface UserContextType {
  user: UserType | null
  setUser: Dispatch<SetStateAction<UserType | null>>
}

const userContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
  const context = useContext(userContext)
  if (!context) {
    throw new Error('context is undefined')
  }
  return context
}

export const UserContextPorvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null)
  const { data: session, status } = useSession()
  const router = useRouter()
  const { setPosts, postsDispatch, setSelectPost } = usePost()
  const { setAnalysis } = useAnalysis()
  const url = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DEV_API_URL

  useEffect(() => {
    if (session === null || undefined) {
      return router.push('/')
    }
    if (user) {
      return
    }
    const getUserFunc = async () => {
      const token = session?.accessToken

      try {
        const res = await fetch(`${url}/api/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        const jsonData = await res.json()
        if (!jsonData) {
          return console.log('data is not found')
        }

        setPosts(jsonData.postsData)
        setSelectPost(jsonData.postsData[0]) // postsData[0]が存在することを確認
        postsDispatch({ type: 'INITIALIZE', posts: jsonData.postsData })

        setAnalysis(jsonData.analysisData)
        setUser(jsonData.userData)
      } catch (error) {
        // return router.push('/')
      }
    }

    getUserFunc()
  }, [session])

  return <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>
}
