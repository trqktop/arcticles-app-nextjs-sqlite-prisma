import { GetStaticProps } from 'next'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

const Home = ({ posts }: any) => {
    const session = useSession()
    const handler = async () => {
        const res = await signIn('credentials', {
            redirect: false,
            email: 'a',
            password: 'a',
        });
    }
    console.log(session)
    return <div onClick={handler}> hello
    </div>
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
    return { props: { posts: [1, 2, 3] } };
};
