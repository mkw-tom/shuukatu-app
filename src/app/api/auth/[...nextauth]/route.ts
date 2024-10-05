import { UserModel } from '@/lib/mongoDB/models/User'
import connectDB from '@/lib/mongoDB/mongodb'
import { compare, hash } from 'bcryptjs'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB()
        if (!credentials) {
          throw new Error('Credentials are required')
        }
        const existUser = await UserModel.findOne({ email: credentials.email })

        if (!credentials.name) {
          if (!existUser) {
            throw new Error(`this user is not found ${credentials.name}`)
          }

          const isValidPassword = await compare(credentials.password, existUser.password)
          if (!isValidPassword) {
            throw new Error('invalid email or password')
          }
          return { id: existUser._id, name: existUser.username, email: existUser.email }
        } else {
          if (existUser) {
            throw new Error(`already exist this user ${credentials.name}`)
          }
          const hashedPassword = await hash(credentials.password, 12)
          const newUser = new UserModel({
            username: credentials.name,
            email: credentials.email,
            password: hashedPassword,
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
          scope: 'read:user user:email user:name user:image',
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
          const newUser = new UserModel({
            username: user?.email || 'unknown',
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
})

// const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
