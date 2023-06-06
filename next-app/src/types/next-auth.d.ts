import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      serial: string;
      number: string;
      date: string;
      posts: string;
      [key: string]: string;
    };
  }
  interface User {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      serial: string;
      number: string;
      date: string;
      posts: string;
      [key: string]: string;
    };
  }
}
