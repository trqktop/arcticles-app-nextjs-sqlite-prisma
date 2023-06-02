

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className="page">
            <header></header>
            <main>{children}</main>
        </div>
    )
}


export default Layout