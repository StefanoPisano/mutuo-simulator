import Card from "@Components/UI/Card.tsx";
import {useTranslation} from "react-i18next";

const Disclaimer = () => {
    const {t} = useTranslation();

    return (
        <Card>
            <div className={"m-auto w-9/12  font-bold text-center text-xs"}>
                {t('disclaimer')}
            </div>
        </Card>
    )
}

export default Disclaimer