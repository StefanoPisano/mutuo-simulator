import * as React from "react";
import LanguageSelector from "@Components/LanguageSelector/LanguageSelector.tsx";

const Nav:React.FC = () => {

    return (
        <>
            <div className={"w-full h-16 flex flex-row p-2 mb-8 mt-2 bg-yimin-blue border text-antiflash-white gap-6 rounded-2xl border-cyan-950"}>

                <div className={"flex flex-auto items-center justify-between pr-2"}>
                    <div className={"font-title text-2xl"}>Mutuo Simulator</div>

                    <div>
                        <LanguageSelector/>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Nav