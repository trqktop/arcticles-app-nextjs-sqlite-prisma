import { Button } from "@mui/joy";
import { signIn, signOut } from "next-auth/react";
import { cookies } from "next/headers";
import { useEffect } from "react";

const App = ({ Component, pageProps }: any) => {

  return (
    <div>
      <header>
        <Button onClick={() => signOut()}>Sign out</Button>
        <Button onClick={() => signIn()}>Sign in</Button>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default App;
