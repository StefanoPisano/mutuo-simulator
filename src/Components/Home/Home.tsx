import * as React from "react";
import Nav from "@Components/Nav/Nav.tsx";
import Dashboard from "@Components/Dashboard/Dashboard.tsx";
import {useTranslation} from "react-i18next";
import Card from "@Components/UI/Card.tsx";

const Home: React.FC = () => {
    const {t} = useTranslation();
    return (
        <>
            <div className={"h-dvh flex flex-col pl-8 pr-8 pb-8"}>
                <Nav/>
                <Dashboard/>
                <Card>
                    <div className={"m-auto w-9/12 bg-yimin-blue p-4 rounded-xl text-antiflash-white font-bold text-center text-xs"}>
                        {t('disclaimer')}
                    </div>
                </Card>
            </div>
        </>
    )
}


export default Home;