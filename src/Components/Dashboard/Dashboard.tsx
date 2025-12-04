import * as React from "react";
import SideBar from "@Components/Dashboard/SideBar/SideBar.tsx";
import styles from "./dashboard.module.scss";
import Card from "@Components/UI/Card.tsx";
import Input from "@Components/UI/Input.tsx";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import type {FormDefinition} from "@Components/interfaces/FormDefinition.ts";
import Estimates from "@Components/Estimates/Estimates.tsx";
import type {FormDefinitionEstimates} from "@Components/interfaces/FormDefinitionEstimates.ts";
import type {EventResponse} from "@Components/interfaces/EventResponse.ts";
import type {FormField} from "@Components/interfaces/FormField.ts";


const Dashboard: React.FC = () => {
    const {t} = useTranslation();
    const defaultFormData: FormDefinition = {
        agencyRate: {isValid: true, value: 4},
        bankRate: {isValid: true, value: 3.2},
        monthlyRate: {isValid: true, value: 0},
        numberOfInstallments: {isValid: true, value: 360},
        mortgageDuration: {isValid: true, value: 30},
        budget: {isValid: true, value: 0},
        mortgage: {isValid: true, value: 80},
        bankAssessment: {isValid: true, value: 1},
        appraisal: {isValid: true, value: 350},
        substituteTax: {isValid: true, value: 0.25},
        fireAndExplosion: {isValid: true, value: 2177},
        tcmPolicy: {isValid: true, value: 0},
        notary: {isValid: true, value: 5000},
        extra: {isValid: true, value: 0},
        broker: {isValid: true, value: 1},
        currency: {isValid: true, value: "€"}
    };


    const defaultEstimates: FormDefinitionEstimates = {
        mortgageDepositEstimate: {isValid: true, value: 0},
        bankAssessmentEstimate: {isValid: true, value: 0},
        initialInvestmentEstimate: {isValid: true, value: 0},
        mortgagePaymentEstimate: {isValid: true, value: 0},
        substituteTaxEstimate: {isValid: true, value: 0},
        brokerEstimate: {isValid: true, value: 0},
        notaryEstimate: {isValid: true, value: 0},
        agencyEstimate: {isValid: true, value: 0},
        currency: {isValid: true, value: defaultFormData.currency.value}
    }

    const [estimates, setEstimates] = useState<FormDefinitionEstimates>(defaultEstimates);
    const [formData, setFormData] = useState(defaultFormData);

    const updateFormData = (name: string, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const updateEstimatesData = (name: string, value: FormField<any>) => {
        setEstimates((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleInputChange = (value: number, name: string): EventResponse => {
        const response = handleValidation(value, name);

        updateFormData(name, {isValid: !response.hasError, value: value});

        return response;
    }

    const handleValidation = (value: number, name: string): EventResponse => {
        switch (name) {
            case 'agencyRate':
            case 'monthlyRate':
            case 'bankRate':
            case 'bankAssessment':
            case 'mortgage':
            case 'broker': {
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
        updateFormData("monthlyRate", {isValid: true, value: rate});
    }, [formData.bankRate]);

    useEffect(() => {
        if(formData.mortgageDuration.isValid) {
            const installments = calculateMortgageInstallments(formData.mortgageDuration.value);
            updateFormData("numberOfInstallments", {isValid: true, value: installments});
        } else {
            updateFormData("numberOfInstallments", {isValid: false, value: "-"});
        }
    }, [formData.mortgageDuration]);

    useEffect(() => {
        const agencyCheck = Boolean(formData.agencyRate.value) && formData.agencyRate.isValid && !isNaN(formData.agencyRate.value);
        const budgetCheck = Boolean(formData.budget.value) && formData.budget.isValid && !isNaN(formData.budget.value);

        if (agencyCheck && budgetCheck) {
            const agencyAmountWithoutIVA = formData.agencyRate.value * formData.budget.value / 100;
            const iva = 0.22 * agencyAmountWithoutIVA;
            updateEstimatesData("agencyEstimate", {
                isValid: false,
                value: parseFloat((agencyAmountWithoutIVA + iva).toFixed(2))
            });
        } else {
            updateEstimatesData("agencyEstimate", {isValid: false, value: "-"});
        }
    }, [formData.mortgageDuration, formData.budget, formData.bankRate, formData.agencyRate]);


    useEffect(() => {
        const mortgageCheck: boolean = Boolean(formData.mortgage.value) && formData.mortgage.isValid && !isNaN(formData.mortgage.value);
        const budgetCheck: boolean = Boolean(formData.budget.value) && formData.budget.isValid && !isNaN(formData.budget.value);

        if (mortgageCheck && budgetCheck) {
            const value = getMortgageDepositEstimate(formData.budget.value, formData.mortgage.value);
            updateEstimatesData("mortgageDepositEstimate", {isValid: true, value: value})
        } else {
            updateEstimatesData("mortgageDepositEstimate", {isValid: false, value: "-"});
        }
    }, [formData.mortgage, formData.budget])

    const getMortgageDepositEstimate = (housePrice: number, mortgagePerc: number) => housePrice - (housePrice * mortgagePerc / 100);

    useEffect(() => {
        const mortgageCheck: boolean = Boolean(formData.mortgage.value) && formData.mortgage.isValid && !isNaN(formData.mortgage.value);
        const budgetCheck: boolean = Boolean(formData.budget.value) && formData.budget.isValid && !isNaN(formData.budget.value);
        const bankAssessmentCheck: boolean = Boolean(formData.bankAssessment.value) && formData.bankAssessment.isValid && !isNaN(formData.bankAssessment.value);

        if (mortgageCheck && budgetCheck && bankAssessmentCheck) {
            const value = (formData.bankAssessment.value * (formData.budget.value * formData.mortgage.value / 100)) / 100;
            updateEstimatesData("bankAssessmentEstimate", {isValid: true, value: value})
        } else {
            updateEstimatesData("bankAssessmentEstimate", {isValid: false, value: "-"});
        }

    }, [formData.mortgage, formData.budget, formData.bankAssessment])


    useEffect(() => {
        const mortgageCheck: boolean = Boolean(formData.mortgage.value) && formData.mortgage.isValid && !isNaN(formData.mortgage.value);
        const budgetCheck: boolean = Boolean(formData.budget.value) && formData.budget.isValid && !isNaN(formData.budget.value);
        const substituteTaxCheck: boolean = Boolean(formData.substituteTax.value) && formData.substituteTax.isValid && !isNaN(formData.substituteTax.value);

        if (mortgageCheck && budgetCheck && substituteTaxCheck) {
            const value = (formData.substituteTax.value * (formData.budget.value * formData.mortgage.value / 100)) / 100;
            updateEstimatesData("substituteTaxEstimate", {isValid: true, value: value})
        } else {
            updateEstimatesData("substituteTaxEstimate", {isValid: false, value: "-"});
        }

    }, [formData.mortgage, formData.budget, formData.substituteTax])

    useEffect(() => {
        const mortgageCheck: boolean = Boolean(formData.mortgage.value) && formData.mortgage.isValid && !isNaN(formData.mortgage.value);
        const budgetCheck: boolean = Boolean(formData.budget.value) && formData.budget.isValid && !isNaN(formData.budget.value);
        const brokerCheck: boolean = Boolean(formData.broker.value) && formData.broker.isValid && !isNaN(formData.broker.value);

        if (mortgageCheck && budgetCheck && brokerCheck) {
            const value = (formData.broker.value * (formData.budget.value * formData.mortgage.value / 100)) / 100;
            updateEstimatesData("brokerEstimate", {isValid: true, value: value})
        } else {
            updateEstimatesData("brokerEstimate", {isValid: false, value: "-"});
        }

    }, [formData.mortgage, formData.budget, formData.broker])

    useEffect(() => {
        const notaryCheck: boolean = Boolean(formData.notary) && formData.notary.isValid && !isNaN(formData.notary.value);
        if (notaryCheck) {
            updateEstimatesData("notaryEstimate", {isValid: true, value: formData.notary.value})
        } else {
            updateEstimatesData("notaryEstimate", {isValid: false, value: "-"});
        }

    }, [formData.notary])


    useEffect(() => {
            const monthlyRateCheck: boolean = Boolean(formData.monthlyRate.value) && formData.monthlyRate.isValid && !isNaN(formData.monthlyRate.value);
            const budgetCheck: boolean = Boolean(formData.budget.value) && formData.budget.isValid && !isNaN(formData.budget.value);
            const numberOfInstallmentsCheck: boolean = Boolean(formData.numberOfInstallments) && formData.numberOfInstallments.isValid && !isNaN(formData.numberOfInstallments.value);
            const mortgageCheck: boolean = Boolean(formData.mortgage.value) && formData.mortgage.isValid && !isNaN(formData.mortgage.value);

            if (monthlyRateCheck && budgetCheck && numberOfInstallmentsCheck && mortgageCheck) {
                const value = (formData.budget.value - getMortgageDepositEstimate(formData.budget.value, formData.mortgage.value)) * (formData.monthlyRate.value *
                    (Math.pow(1 + formData.monthlyRate.value, formData.numberOfInstallments.value)) /
                    (Math.pow(1 + formData.monthlyRate.value, formData.numberOfInstallments.value) - 1))

                updateEstimatesData("mortgagePaymentEstimate", {
                    isValid: true, value: parseFloat(value.toFixed(2))
                })
            } else {
                updateEstimatesData("mortgagePaymentEstimate", {isValid: false, value: "-"});
            }

        },
        [formData.monthlyRate, formData.numberOfInstallments, formData.mortgage, formData.budget])

    const calculateMortgageInstallments = (duration: number) => duration ? parseInt((duration * 12).toFixed(0)) : 0;
    const calculateMonthlyRate = (bankRate: number) => bankRate ? bankRate / 100 / 12 : 0;


    return (
        <div className="w-full h-full flex flex-row gap-10">
            <div className="basis-24">
                <SideBar/>
            </div>
            <div className={"p-8 basis-full border-french-gray rounded-2xl border " + styles.bgDashboard}>
                <Card title={t("configuration.title")}>
                    <div className="flex gap-2">
                        <Input label={t("configuration.realEstateAgency.label")} symbol={"%"}
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
                        <Input label={t("configuration.monthlyRate.label")}
                               placeholder={t("configuration.monthlyRate.placeholder")} symbol={"%"} inputType="text"
                               value={formData.monthlyRate} name={"monthlyRate"} disabled={true}/>
                        <Input label={t("configuration.mortgageDuration.label")}
                               placeholder={t("configuration.mortgageDuration.placeholder")} inputType="text"
                               symbol={"Y"}
                               value={formData.mortgageDuration} name={"mortgageDuration"} disabled={false}
                               onChange={handleInputChange}/>
                        <Input label={t("configuration.numberOfInstallments.label")} symbol={"N°"}
                               placeholder={t("configuration.numberOfInstallments.placeholder")} inputType="text"
                               value={formData.numberOfInstallments} name={"numberOfInstallments"} disabled={true}/>
                    </div>
                    <div className="flex gap-2">
                        <Input label={t("configuration.bankAssessment.label")} symbol={"%"}
                               placeholder={t("configuration.bankAssessment.placeholder")} inputType="text"
                               value={formData.bankAssessment} name={"bankAssessment"} disabled={false}
                               onChange={handleInputChange}/>
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
                    <div className="flex gap-2">
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

                <Card title={t("budget.title")}>
                    <div className="flex gap-2">
                        <Input label={t("budget.homePrice.label")} placeholder={t("budget.homePrice.placeholder")}
                               symbol={formData.currency.value}
                               inputType="text" value={formData.budget} name={"budget"} onChange={handleInputChange}/>
                    </div>
                </Card>

                <Estimates estimates={estimates}/>

            </div>
        </div>
    );
};

export default Dashboard;
