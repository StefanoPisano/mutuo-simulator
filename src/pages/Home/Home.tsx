import { lazy, Suspense } from "react"
import Nav from "@Components/Nav/Nav.tsx";


const DashboardPage = lazy(() => import("../DashboardPage/DashboardPage"))
const Footer = lazy(() => import("@Components/Footer/Disclaimer"))
const Home = () => {

    return (
        <>
            <main className="h-dvh flex flex-col pl-8 pr-8 pb-8 min-h-screen justify-between">
                <Nav />

                <div className="min-h-[900px]">
                    <Suspense fallback={null}>
                        <DashboardPage />
                    </Suspense>
                </div>

                <Footer />
            </main>
        </>
    )
}


export default Home;