import { UserModel } from '@/lib/mongoDB/models/User'
import connectDB from '@/lib/mongoDB/mongodb'
import { compare, hash } from 'bcryptjs'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { v4 as uuidv4 } from 'uuid'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB()
        if (!credentials) {
          throw new Error('Credentials are required')
        }
        const existUser = await UserModel.findOne({ email: credentials.email })

        if (!credentials.username) {
          if (!existUser) {
            throw new Error(`this user is not found ${credentials.username}`)
          }

          const isValidPassword = await compare(credentials.password, existUser.password)
          if (!isValidPassword) {
            throw new Error('invalid email or password')
          }
          return { id: existUser._id, name: existUser.username, email: existUser.email }
        } else {
          if (existUser) {
            throw new Error(`already exist this user ${credentials.username}`)
          }
          const hashedAndSaltPassword = await hash(credentials.password, 12)
          const hashedAndSaltEmail = await hash(credentials.email, 12)

          const newUser = new UserModel({
            customId: uuidv4(),
            username: credentials.username,
            email: hashedAndSaltEmail,
            password: hashedAndSaltPassword,
          })
          await newUser.save()
          return { id: newUser._id, name: newUser.username, email: newUser.email }
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email user:login user:avatar_url',
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt', // ここで正しい型を指定
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({ token, profile, account }) {
      if (account) {
        token.id = account.providerAccountId
        token.accessToken = account?.access_token
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken
        session.id = token.id
      }
      return session
    },
    async signIn({ user, account, profile }) {
      await connectDB()

      if (account?.provider === 'github' || account?.provider === 'google') {
        // MongoDBに既存のユーザーがいるか確認
        const existUser = await UserModel.findOne({ email: user?.email })

        if (!existUser) {
          const hashedAndSaltEmail = await hash(user?.email as string, 12)
          const newUser = new UserModel({
            customId: uuidv4(),
            username: user?.name || 'unknown',
            email: user?.email,
            password: await hash(Math.random().toString(36).slice(-8), 12),
            profilePicture: user?.image,
          })
          await newUser.save()
        }
      }

      return true
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user',
  },
})

// const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
