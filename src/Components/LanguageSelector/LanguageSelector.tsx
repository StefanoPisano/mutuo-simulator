import * as React from "react";
import {useTranslation} from "react-i18next";
import {useState} from "react";

const LanguageSelector: React.FC = () => {
    const {i18n} = useTranslation();

    const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);

    const handleChangeLanguage = (lang: string) => {
        setSelectedLanguage(lang);
        i18n.changeLanguage(lang);
    }

    const availableLanguages = [
        {
            "id": "en",
            "label": "\uD83C\uDDFA\uD83C\uDDF8"
        },
        {
            "id": "it",
            "label": "\uD83C\uDDEE\uD83C\uDDF9"
        }
    ];


    return (
        <>
            <div className={"flex flex-row justify-end gap-2 text-xl"}>
                {availableLanguages.map((lang) =>
                    (<div key={lang.id} onClick={() => handleChangeLanguage(lang.id)}
                          className={"cursor-pointer " + (lang.id === selectedLanguage ? " border-yimin-blue border-b-4" : "")}>{lang.label}</div>))
                }
            </div>
        </>
    )
}

export default LanguageSelector