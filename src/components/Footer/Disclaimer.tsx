import Disclaimer from "@Components/Disclaimer/Disclaimer.tsx";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

const Footer = () => {

    return (
        <>
            <footer className={"bg-yimin-blue shadow-lg  p-4 rounded-xl text-antiflash-white"}>
                <div className={"m-auto w-9/12"}>
                    <Disclaimer/>
                </div>

                <div className={"mt-2.5 font-mono text-xs text-center"}>
                    Developed with <FavoriteBorder fontSize={"inherit"}/> by <a className={"underline"} href={"https://stefanopisano.github.io/"}>Stefano Pisano</a><br/>
                    Source code is under <a className={"underline"} href={"../LICENSE"}>MIT License</a><br/>
                    © {new Date().getFullYear()}
                </div>
            </footer>
        </>
    )
}

export default Footer