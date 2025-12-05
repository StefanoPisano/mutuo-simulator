import * as React from "react";
import {useEffect, useState} from "react";
import Card from "../UI/Card.tsx";
import Input from "../UI/Input.tsx";
import {useTranslation} from "react-i18next";
import type {FormDefinition} from "../interfaces/FormDefinition.ts";
import Estimates from "../Estimates/Estimates.tsx";
import type {EventResponse} from "../interfaces/EventResponse.ts";
import type {FormField} from "../interfaces/FormField.ts";
import Checkbox from "@Components/UI/Checkbox.tsx";


const Dashboard: React.FC = () => {
    const {t} = useTranslation();

    type FormDataKeys = keyof FormDefinition;
    const defaultFormData: FormDefinition = {
        agencyRate: {isValid: true, value: 4, unit: "percentage"},
        bankRate: {isValid: true, value: 3.2, unit: "percentage"},
        monthlyRate: {isValid: true, value: 0, unit: "percentage"},
        numberOfInstallments: {isValid: true, value: 360, unit: "total"},
        mortgageDuration: {isValid: true, value: 30, unit: "duration"},
        budget: {isValid: true, value: 0, unit: "currency"},
        mortgage: {isValid: true, value: 80, unit: "percentage"},
        bankAssessment: {isValid: true, value: 1, unit: "percentage"},
        appraisal: {isValid: true, value: 350, unit: "percentage"},
        substituteTax: {isValid: true, value: 0.25, unit: "percentage"},
        fireAndExplosion: {isValid: true, value: 2177, unit: "currency"},
        tcmPolicy: {isValid: true, value: 0, unit: "currency"},
        notary: {isValid: true, value: 5000, unit: "currency"},
        extra: {isValid: true, value: 0, unit: "currency"},
        broker: {isValid: true, value: 1, unit: "percentage"},
        currency: {isValid: true, value: "€", unit: "none"}
    };


    const [formData, setFormData] = useState(defaultFormData);

    const updateFormData = (name: string, value: FormField<any>) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleInputChange = (value: number, name: FormDataKeys): EventResponse => {
        const response = handleValidation(value, name);

        updateFormData(name, {isValid: !response.hasError, value: value, unit: formData[name].unit});

        return response;
    }

    const handleCheckboxChange = (value: boolean, name: string) => {
        switch (name) {
            case 'bankAssessment':
            case 'agencyRate':
            {
                updateFormData(name, {value: 0, unit: value ? 'currency' : 'percentage', isValid : true})
            }
        }
    }

    const handleValidation = (value: number, name: FormDataKeys): EventResponse => {
        switch (formData[name].unit) {
            case 'percentage': {
                return isNaN(value) || value > 100 || value < 0 ? {
                    hasError: true,
                    msg: 'Invalid percentage'
                } : {hasError: false}
            }
            default: {
                return isNaN(value) || value < 0 ? {
                    hasError: true,
                    msg: 'Must be a number greater than 0'
                } : {hasError: false}
            }
        }
    }

    // Effects
    useEffect(() => {
        const rate = calculateMonthlyRate(formData.bankRate.value);
        updateFormData("monthlyRate", {isValid: true, value: rate, unit: formData.bankRate.unit});
    }, [formData.bankRate]);

    useEffect(() => {
        if (formData.mortgageDuration.isValid) {
            const installments = calculateMortgageInstallments(formData.mortgageDuration.value);
            updateFormData("numberOfInstallments", {isValid: true, value: installments, unit: formData.mortgageDuration.unit});
        } else {
            updateFormData("numberOfInstallments", {isValid: false, value: 0, unit: formData.mortgageDuration.unit});
        }
    }, [formData.mortgageDuration]);


    const calculateMortgageInstallments = (duration: number) => duration ? parseInt((duration * 12).toFixed(0)) : 0;
    const calculateMonthlyRate = (bankRate: number) => bankRate ? bankRate / 100 / 12 : 0;


    return (
        <div className="w-full h-full flex flex-row gap-10">
            <div className={"p-8 basis-full"}>

                <Card title={t("budget.title")}>
                    <div className="flex gap-2">
                        <Input label={t("budget.homePrice.label")} placeholder={t("budget.homePrice.placeholder")}
                               symbol={formData.currency.value}
                               inputType="text" value={formData.budget} name={"budget"} onChange={handleInputChange}/>
                    </div>
                </Card>

                <Card title={t("configuration.title")}>
                    <div className="flex gap-2">
                        <Checkbox label={"Fixed Rate"}
                                  checked={formData.agencyRate.unit === 'currency'} name={"agencyRate"} disabled={false}
                                  onChange={handleCheckboxChange}/>
                        <Input label={t("configuration.realEstateAgency.label")} symbol={formData.agencyRate.unit === 'currency' ? formData.currency.value : '%'}
                               placeholder={t("configuration.realEstateAgency.placeholder")} inputType="text"
                               value={formData.agencyRate} name={"agencyRate"} disabled={false}
                               onChange={handleInputChange}/>
                    </div>
                    <div className="flex gap-2">
                        <Input label={t("configuration.mortgage.label")}
                               placeholder={t("configuration.mortgage.placeholder")} symbol={"%"} inputType="text"
                               value={formData.mortgage}
                               disabled={false} name={"mortgage"} onChange={handleInputChange}/>
                        <Input label={t("configuration.bankRate.label")}
                               placeholder={t("configuration.bankRate.placeholder")} symbol={"%"} inputType="text"
                               value={formData.bankRate}
                               disabled={false} name={"bankRate"} onChange={handleInputChange}/>
                        <Input label={t("configuration.mortgageDuration.label")}
                               placeholder={t("configuration.mortgageDuration.placeholder")} inputType="text"
                               symbol={"Y"}
                               value={formData.mortgageDuration} name={"mortgageDuration"} disabled={false}
                               onChange={handleInputChange}/>
                    </div>
                    <div className="flex flex-auto gap-5">
                        <Checkbox label={"Fixed Rate"}
                                  checked={formData.bankAssessment.unit === 'currency'} name={"bankAssessment"} disabled={false}
                                  onChange={handleCheckboxChange}/>
                        <Input label={t("configuration.bankAssessment.label")} symbol={formData.bankAssessment.unit === 'currency' ? formData.currency.value : '%'}
                               placeholder={t("configuration.bankAssessment.placeholder")} inputType="text"
                               value={formData.bankAssessment} name={"bankAssessment"} disabled={false}
                               onChange={handleInputChange}/>
                    </div>
                    <div className="flex flex-auto gap-2">
                        <Input label={t("configuration.appraisal.label")}
                               placeholder={t("configuration.appraisal.placeholder")} symbol={formData.currency.value}
                               inputType="text" value={formData.appraisal} name={"appraisal"}
                               disabled={false} onChange={handleInputChange}/>
                        <Input label={t("configuration.substituteTax.label")}
                               placeholder={t("configuration.substituteTax.placeholder")} symbol={"%"} inputType="text"
                               value={formData.substituteTax} name={"substituteTax"} disabled={false}
                               onChange={handleInputChange}/>
                        <Input label={t("configuration.fireAndExplosion.label")}
                               placeholder={t("configuration.fireAndExplosion.placeholder")}
                               symbol={formData.currency.value}
                               inputType="text"
                               value={formData.fireAndExplosion} name="fireAndExplosion" disabled={false}
                               onChange={handleInputChange}/>
                        <Input label={t("configuration.tcmPolicy.label")}
                               placeholder={t("configuration.tcmPolicy.placeholder")} symbol={formData.currency.value}
                               inputType="text" value={formData.tcmPolicy} name={"tcmPolicy"}
                               disabled={false} onChange={handleInputChange}/>
                    </div>
                    <div className="flex flex-auto gap-2">
                        <Input label={t("configuration.notary.label")}
                               placeholder={t("configuration.notary.placeholder")} symbol={formData.currency.value}
                               inputType="text" value={formData.notary} name={"notary"}
                               disabled={false} onChange={handleInputChange}/>
                        <Input label={t("configuration.extra.label")} placeholder={t("configuration.extra.placeholder")}
                               symbol={formData.currency.value}
                               inputType="text" value={formData.extra} name={"extra"} disabled={false}
                               onChange={handleInputChange}/>
                        <Input label={t("configuration.broker.label")}
                               placeholder={t("configuration.broker.placeholder")} symbol={"%"} inputType="text"
                               value={formData.broker} name={"broker"}
                               disabled={false} onChange={handleInputChange}/>
                    </div>
                </Card>

                <Estimates inputData={formData}/>

            </div>
        </div>
    );
};

export default Dashboard;
