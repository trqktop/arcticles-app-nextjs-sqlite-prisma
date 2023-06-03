import Content from '@/components/Content'
import Header from '@/components/Header'
import { GetStaticProps } from 'next'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import Posts from '@/components/Posts'

//


const Home = ({ data }: any) => {
    const posts = JSON.parse(data)
    return (
        <div>
            <Header />
            <Content>
                <Posts posts={posts} />
            </Content>
        </div>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
    const posts = (await prisma.post.findMany({ include: { author: true } }))
    return { props: { data: JSON.stringify(posts) } };
};
