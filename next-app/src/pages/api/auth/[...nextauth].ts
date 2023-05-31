import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
// import { getToken } from "next-auth/jwt";
// import Sess
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_URL + "",
  // callbacks: {
  //   async jwt({ token, account }) {
  //     // Persist the OAuth access_token to the token right after signin
  //     if (account) {
  //       token.accessToken = account.access_token;
  //     }
  //     return token;
  //   },
  //   async session({ session, token, user }: any) {
  //     // Send properties to the client, like an access_token from a provider.
  //     session.accessToken = token.accessToken;
  //     return session;
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
};

export default NextAuth(authOptions);

// {
//   "data": {
//       "user": {
//           "name": "admin",
//           "email": "admin@admin.com"
//       },
//       "expires": "2023-06-30T09:14:09.651Z"
//   },
//   "status": "authenticated"
// }
