import Card from "@Components/UI/Card.tsx";
import { Suspense } from 'react';
import {useTranslation} from "react-i18next";

const Disclaimer = () => {
    const { t } = useTranslation(['disclaimer']);

    return (
        <Suspense fallback="loading">
            <Card>
                <div className={"m-auto w-9/12  font-bold text-center text-xs"}>
                    {t('disclaimer')}
                </div>
            </Card>
        </Suspense>
    )
}

export default Disclaimer