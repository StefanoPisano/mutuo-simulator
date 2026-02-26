import {lazy} from "react"
import Nav from "@Components/Nav/Nav.tsx";


const DashboardPage = lazy(() => import("../DashboardPage/DashboardPage"))
const Footer = lazy(() => import("@Components/Footer/Disclaimer"))
const Home = () => {

    return (
        <>
            <main className="h-dvh flex flex-col pl-8 pr-8 pb-8 min-h-screen justify-between">
                <Nav/>
                <DashboardPage/>
                <Footer/>
            </main>
        </>
    )
}


export default Home;