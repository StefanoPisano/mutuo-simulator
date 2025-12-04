import Nav from "@Components/Nav/Nav.tsx";
import DashboardPage from "@Pages/DashboardPage/DashboardPage.tsx";
import Footer from "@Components/Footer/Disclaimer.tsx";

const Home = () => {
    return (
        <>
            <div className={"h-dvh flex flex-col pl-8 pr-8 pb-8 min-h-screen justify-between"}>
                <Nav/>
                <DashboardPage/>
                <Footer/>
            </div>
        </>
    )
}


export default Home;