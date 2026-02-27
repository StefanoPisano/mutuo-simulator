import * as React from "react";
import { useEffect, useState } from "react";
import Card from "../UI/Card.tsx";
import Input from "../UI/Input.tsx";
import { useTranslation } from "react-i18next";
import type { FormDefinition } from "../interfaces/FormDefinition.ts";
import Estimates from "../Estimates/Estimates.tsx";
import type { EventResponse } from "../interfaces/EventResponse.ts";
import type { FormField } from "../interfaces/FormField.ts";
import Checkbox from "@Components/UI/Checkbox.tsx";


const Dashboard: React.FC = () => {
    const { t } = useTranslation(['translation']);

    type FormDataKeys = keyof FormDefinition;
    const defaultFormData: FormDefinition = {
        agencyRate: { isValid: true, value: 4, unit: "percentage" },
        bankRate: { isValid: true, value: 3.20, unit: "total" },
        monthlyRate: { isValid: true, value: 0, unit: "percentage" },
        numberOfInstallments: { isValid: true, value: 360, unit: "total" },
        mortgageDuration: { isValid: true, value: 30, unit: "duration" },
        budget: { isValid: true, value: 0, unit: "currency" },
        mortgage: { isValid: true, value: 80, unit: "percentage" },
        bankAssessment: { isValid: true, value: 1, unit: "percentage" },
        appraisal: { isValid: true, value: 350, unit: "percentage" },
        substituteTax: { isValid: true, value: 0.25, unit: "percentage" },
        fireAndExplosion: { isValid: true, value: 2177, unit: "currency" },
        tcmPolicy: { isValid: true, value: 0, unit: "currency" },
        notary: { isValid: true, value: 5000, unit: "currency" },
        extra: { isValid: true, value: 0, unit: "currency" },
        broker: { isValid: true, value: 0, unit: "percentage" },
        currency: { isValid: true, value: "€", unit: "none" }
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

        updateFormData(name, { isValid: !response.hasError, value: value, unit: formData[name].unit });

        return response;
    }

    const handleCheckboxChange = (value: boolean, name: string) => {
        switch (name) {
            case 'bankAssessment':
            case 'broker':
            case 'agencyRate': {
                updateFormData(name, { value: 0, unit: value ? 'currency' : 'percentage', isValid: true })
            }
        }
    }

    const handleValidation = (value: number, name: FormDataKeys): EventResponse => {
        switch (formData[name].unit) {
            case 'percentage': {
                return isNaN(value) || value > 100 || value < 0 ? {
                    hasError: true,
                    msg: 'Invalid percentage'
                } : { hasError: false }
            }
            default: {
                return isNaN(value) || value < 0 ? {
                    hasError: true,
                    msg: 'Must be a number greater than 0'
                } : { hasError: false }
            }
        }
    }

    // Effects
    useEffect(() => {
        const rate = calculateMonthlyRate(formData.bankRate.value);
        updateFormData("monthlyRate", { isValid: true, value: rate, unit: formData.bankRate.unit });
    }, [formData.bankRate]);

    useEffect(() => {
        if (formData.mortgageDuration.isValid) {
            const installments = calculateMortgageInstallments(formData.mortgageDuration.value);
            updateFormData("numberOfInstallments", {
                isValid: true,
                value: installments,
                unit: formData.mortgageDuration.unit
            });
        } else {
            updateFormData("numberOfInstallments", { isValid: false, value: 0, unit: formData.mortgageDuration.unit });
        }
    }, [formData.mortgageDuration]);


    const calculateMortgageInstallments = (duration: number) => duration ? parseInt((duration * 12).toFixed(0)) : 0;
    const calculateMonthlyRate = (bankRate: number) => bankRate ? bankRate / 100 / 12 : 0;


    return (
        <div className="w-full h-full flex flex-col md:flex-row gap-4 md:gap-10">
            <div className={"p-4 md:p-8 basis-full"}>

                <Card title={t("budget.title")}>
                    <div className="flex justify-center gap-2 w-full">
                        <Input label={t("budget.homePrice.label")} placeholder={t("budget.homePrice.placeholder")}
                            symbol={formData.currency.value}
                            inputType="text" value={formData.budget} name={"budget"} onChange={handleInputChange} />
                    </div>
                </Card>

                <Card title={t("configuration.title")}>
                    <div className={"flex flex-col md:flex-row m-auto justify-center gap-4 md:gap-2"}>
                        <div
                            className="flex flex-col md:flex-row gap-4 basis-full md:basis-1/3 p-1.5 br border rounded-xl border-gray-300 items-center md:items-stretch">
                            <div className="flex flex-row gap-2 w-full items-end justify-center">
                                <Checkbox label={"Fixed Rate"}
                                    checked={formData.agencyRate.unit === 'currency'} name={"agencyRate"}
                                    disabled={false}
                                    onChange={handleCheckboxChange} />
                                <Input label={t("configuration.realEstateAgency.label")}
                                    symbol={formData.agencyRate.unit === 'currency' ? formData.currency.value : '%'}
                                    placeholder={t("configuration.realEstateAgency.placeholder")} inputType="text"
                                    value={formData.agencyRate} name={"agencyRate"} disabled={false}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="flex flex-row gap-2 w-full items-end justify-center">
                                <Checkbox label={"Fixed Rate"}
                                    checked={formData.broker.unit === 'currency'} name={"broker"} disabled={false}
                                    onChange={handleCheckboxChange} />
                                <Input label={t("configuration.broker.label")}
                                    placeholder={t("configuration.broker.placeholder")}
                                    symbol={formData.broker.unit === 'currency' ? formData.currency.value : '%'}
                                    inputType="text"
                                    value={formData.broker} name={"broker"}
                                    disabled={false} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div
                            className="flex flex-col md:flex-row gap-4 basis-full md:basis-1/3 p-1.5 justify-center border rounded-xl border-gray-300 items-center md:items-stretch">
                            <Input label={t("configuration.bankRate.label")}
                                   placeholder={t("configuration.bankRate.placeholder")} symbol={"%"} inputType="text"
                                   value={formData.bankRate}
                                   disabled={false} name={"bankRate"} onChange={handleInputChange} />

                            <Input label={t("configuration.mortgage.label")}
                                placeholder={t("configuration.mortgage.placeholder")} symbol={"%"} inputType="range"
                                value={formData.mortgage} inputStep={1} min={0} max={100}
                                disabled={false} name={"mortgage"} onChange={handleInputChange} />

                            <Input label={t("configuration.mortgageDuration.label")}
                                placeholder={t("configuration.mortgageDuration.placeholder")} symbol={"Y"}
                                inputType="range"
                                value={formData.mortgageDuration} inputStep={1} min={0} max={30}
                                name={"mortgageDuration"} disabled={false}
                                onChange={handleInputChange} />
                        </div>

                    </div>

                    <div className={"flex flex-col md:flex-row m-auto mt-4 mb-4 justify-center w-full md:w-fit"}>
                        <div
                            className="flex flex-col md:flex-row gap-4 p-1.5 border rounded-xl border-gray-300 items-center md:items-stretch w-full">
                            <div className="flex flex-col md:flex-row gap-2 w-full items-center justify-center flex-wrap">
                                <div className="flex flex-row gap-2 items-end">
                                    <Checkbox label={"Fixed Rate"}
                                        checked={formData.bankAssessment.unit === 'currency'}
                                        name={"bankAssessment"}
                                        disabled={false}
                                        onChange={handleCheckboxChange} />
                                    <Input label={t("configuration.bankAssessment.label")}
                                        symbol={formData.bankAssessment.unit === 'currency' ? formData.currency.value : '%'}
                                        placeholder={t("configuration.bankAssessment.placeholder")} inputType="text"
                                        value={formData.bankAssessment} name={"bankAssessment"} disabled={false}
                                        onChange={handleInputChange} />
                                </div>
                                <Input label={t("configuration.appraisal.label")}
                                    placeholder={t("configuration.appraisal.placeholder")}
                                    symbol={formData.currency.value}
                                    inputType="text" value={formData.appraisal} name={"appraisal"}
                                    disabled={false} onChange={handleInputChange} />
                                <Input label={t("configuration.substituteTax.label")}
                                    placeholder={t("configuration.substituteTax.placeholder")} symbol={"%"}
                                    inputType="text"
                                    value={formData.substituteTax} name={"substituteTax"} disabled={false}
                                    onChange={handleInputChange} />
                                <Input label={t("configuration.fireAndExplosion.label")}
                                    placeholder={t("configuration.fireAndExplosion.placeholder")}
                                    symbol={formData.currency.value}
                                    inputType="text"
                                    value={formData.fireAndExplosion} name="fireAndExplosion" disabled={false}
                                    onChange={handleInputChange} />
                                <Input label={t("configuration.tcmPolicy.label")}
                                    placeholder={t("configuration.tcmPolicy.placeholder")}
                                    symbol={formData.currency.value}
                                    inputType="text" value={formData.tcmPolicy} name={"tcmPolicy"}
                                    disabled={false} onChange={handleInputChange} />
                            </div>

                        </div>
                    </div>

                    <div className={"flex flex-col md:flex-row m-auto mt-4 mb-4 justify-center w-full md:w-1/2 gap-4 "}>
                        <div
                            className="flex flex-col md:flex-row gap-4 basis-full md:basis-1/2 p-1.5 border rounded-xl border-gray-300 items-center md:items-stretch">
                            <Input
                                label={t("configuration.notary.label")}
                                placeholder={t("configuration.notary.placeholder")} symbol={formData.currency.value}
                                inputType="text" value={formData.notary} name={"notary"}
                                disabled={false} onChange={handleInputChange} />
                            <Input label={t("configuration.extra.label")}
                                placeholder={t("configuration.extra.placeholder")}
                                symbol={formData.currency.value}
                                inputType="text" value={formData.extra} name={"extra"} disabled={false}
                                onChange={handleInputChange} />

                        </div>
                    </div>
                </Card>

                <Estimates inputData={formData} />

            </div>
        </div>
    );
};

export default Dashboard;
