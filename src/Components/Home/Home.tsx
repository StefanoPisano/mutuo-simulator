import * as React from "react";
import Nav from "@Components/Nav/Nav.tsx";
import Dashboard from "@Components/Dashboard/Dashboard.tsx";

const Home: React.FC = () => {
    return (
        <>
            <div className={"h-dvh flex flex-col pl-8 pr-8 pb-8"}>
                <Nav/>
                <Dashboard/>
            </div>
        </>
    )
}


export default Home;