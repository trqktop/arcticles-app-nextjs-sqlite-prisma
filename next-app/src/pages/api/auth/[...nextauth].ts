import { NextApiHandler } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../lib/prisma";

const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        const { email, password } = req.body!;
        const user: any = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (user && user.password === password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.password = user.password;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }: any) {
      session.user.role = token.role;
      session.user.id = token.id;
      session.user.password = token.password;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/registration",
  },
  secret: process.env.SECRET,
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
