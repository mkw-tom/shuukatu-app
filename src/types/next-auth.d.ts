import 'next-auth'
import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string | number // ユーザーのIDの型を指定
  }

  interface Session {
    user: {
      address: string
      id: string | number
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    /** OpenID ID Token */
    idToken?: string
    id: string | number
  }
}
