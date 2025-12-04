import * as React from "react";
import LanguageSelector from "@Components/LanguageSelector/LanguageSelector.tsx";
import styles from "./nav.module.scss";

const Nav:React.FC = () => {

    return (
        <>
            <div className={"w-full flex flex-row mb-8 mt-2 bg-yimin-blue text-antiflash-white gap-6 rounded-xl"}>

                <div className={"flex flex-auto items-center justify-between"}>
                    <div className={"font-title text-2xl pl-2"}>Mutuo Simulator</div>

                    <div className={"basis-1/3 bg-coral text-end h-full p-4 rounded-tr-2xl rounded-br-2xl " + styles.roundedLeft}>
                        <LanguageSelector/>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Nav