// import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/App";
// const inter = Inter({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <SessionProvider session={session}>
      <Layout Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}
