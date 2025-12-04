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
            <div className={"flex flex-row justify-end text-xl "}>
                <div className={"flex -flew-row gap-4 bg-yimin-blue p-2 pl-3.5 pr-3.5 rounded-xl"}>
                    {availableLanguages.map((lang) =>
                        (<div key={lang.id} onClick={() => handleChangeLanguage(lang.id)}
                              className={"cursor-pointer " + (lang.id === selectedLanguage ? " border-coral border-b-4" : "")}>{lang.label}</div>))
                    }
                </div>
            </div>
        </>
    )
}

export default LanguageSelector