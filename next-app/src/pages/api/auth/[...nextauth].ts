import { NextApiHandler } from "next";
import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { AdapterUser } from "next-auth/adapters";
const prisma = new PrismaClient()

const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = req.body!
        const user = await prisma.user.findUnique({
          where: {
            email: email
          }
        })
        if (user && user.password === password) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    jwt({ token, user }: any) {
      if (user) token.role = user.role
      return token
    },
    session({ session, token }: any) {
      session.user.role = token.role
      return session
    }
  },
  secret: process.env.SECRET,
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
