import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_URL + "",
  // callbacks: {
  //   async session({ session, user }) {
  //     return session
  //   },
  // },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user: any = await prisma.user.findFirst({
          where: {
            email: credentials?.username,
            password: credentials?.password,
          },
        });

        if (user) {
          return user;
        } else {
          return null;
        }
      },

    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = user
      console.log(user)
      return session
    }
  },
};

export default NextAuth(authOptions);