import * as React from "react";
import {useTranslation} from "react-i18next";
import {useState} from "react";

const LanguageSelector:React.FC = () => {
    const { t, i18n } = useTranslation();

    const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);

    const handleChangeLanguage = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(event.target.value);
        i18n.changeLanguage(event.target.value);
    }

    const availableLanguages = t('langs.list', { returnObjects: true });


    return (
        <>
            <select className={"pl-2 pr-2 h-6 text-black"} onChange={handleChangeLanguage} value={selectedLanguage}>
                {Object.values(availableLanguages).map((lang:string) =>
                    (<option key={lang} value={lang}>{t(`langs.${lang}.name`)}</option>))
                }
            </select>
        </>
    )
}

export default LanguageSelector