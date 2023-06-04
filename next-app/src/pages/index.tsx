import Content from '@/components/Content'
import Header from '@/components/Header'
import { GetStaticProps } from 'next'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Posts from '@/components/Posts'
import prisma from '../../lib/prisma'
import React from 'react';


type PostFormData = {
  title: string, content: string, type: 'update' | 'create', id?: string
}


export const PostContext = React.createContext({
  deletePostHandler: (id: string) => Promise.resolve(),
  createPostHandler: (args: PostFormData) => Promise.resolve(),
});

const Home = ({ data }: any) => {
  const [state, setState] = useState({
    posts: JSON.parse(data),
  })

  const deletePostHandler = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/post/${id}`, {
        method: "DELETE",
      })
      const data = await response.json();
      setState((p) => ({ ...p, posts: data.posts }))
    } catch (error) {
      console.log(error)
    }
  };



  const createPostHandler = async ({ type, id, ...data }: PostFormData) => {
    switch (type) {
      case 'update':
        const response = await fetch(`http://localhost:3000/api/post/${id}`, {
          method: "UPDATE",
          body: JSON.stringify(data)
        })
        console.log(data)
        // const data = await response.json();
        // setState((p) => ({ ...p, posts: data.posts }))
        break
      case 'create':
        break
    }
  }


  return (
    <div>
      <PostContext.Provider value={{ deletePostHandler, createPostHandler }}>
        <Header />
        <Content>
          <Posts posts={state.posts} />
        </Content>
      </PostContext.Provider>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await prisma.post.findMany({ include: { author: true } }))
  return { props: { data: JSON.stringify(posts) } };
};
