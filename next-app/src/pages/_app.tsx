import Layout from "@/components/Layout";
import { UpdatedPost } from "@/types";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import * as React from "react";

export const PostContext = React.createContext({
  deletePostHandler: (id: string) => Promise.resolve(),
  updatePostHandler: (args: UpdatedPost) => Promise.resolve(),
});

const App = ({ Component, pageProps }: AppProps) => {
  const deletePostHandler = async (id: string) => {
    try {
      const response = await fetch(`/api/post/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { message: "error" };
    }
  }

  const updatePostHandler = async ({ type, id, ...data }: UpdatedPost) => {
    console.log(type)
    switch (type) {
      case "update":
        try {
          const response = await fetch(
            `/api/post/${id}`,
            {
              method: "PATCH",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const result = await response.json();
          console.log(result)
          return result;
        } catch (error) {
          console.log(error);
        }
        break;
      case "create":
        try {
          const response = await fetch(`/api/post`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          return result;
        } catch (error) {
          console.log(error);
        }
        break;
    }
    console.log(JSON.stringify(data))
  }


  return (
    <SessionProvider session={pageProps.session}>
      <PostContext.Provider value={{ deletePostHandler, updatePostHandler }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PostContext.Provider>
    </SessionProvider>
  );
};

export default React.memo(App);
