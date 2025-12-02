import * as React from "react";
import SideBar from "@Components/Dashboard/SideBar/SideBar.tsx";
import styles from "./dashboard.module.scss";
import Card from "@Components/UI/Card.tsx";
import Input from "@Components/UI/Input.tsx";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";


interface FormDefinition {
    agencyRate: number,
    bankRate: number,
    monthlyRate:  number,
    numberOfInstallments:  number,
    mortgageDuration:  number,
    budget:  number,
    mortgage:  number,
    bankAssessment:  number,
    appraisal:  number,
    substituteTax:  number,
    fireAndExplosion:  number,
    tcmPolicy:  number,
    notary:  number,
    extra:  number,
    broker:  number,
    mortgageDepositEstimate:  number,
    bankAssessmentEstimate:  number,
    initialInvestmentEstimate:  number,
    mortgagePaymentEstimate:  number,
    substituteTaxEstimate:  number,
    brokerEstimate:  number,
    notaryEstimate:  number,
    agencyEstimate:  number,
    currency: string
}


const Dashboard: React.FC = () => {
    const {t} = useTranslation();
    const defaultFormData:FormDefinition = {
        agencyRate: 4,
        bankRate: 3.2,
        monthlyRate: 0,
        numberOfInstallments: 360,
        mortgageDuration: 30,
        budget: 0,
        mortgage: 80,
        bankAssessment: 1,
        appraisal: 350,
        substituteTax: 0.25,
        fireAndExplosion: 2177,
        tcmPolicy: 0,
        notary: 5000,
        extra: 0,
        broker: 1,
        mortgageDepositEstimate: 0,
        bankAssessmentEstimate: 0,
        initialInvestmentEstimate: 0,
        mortgagePaymentEstimate: 0,
        substituteTaxEstimate: 0,
        brokerEstimate: 0,
        notaryEstimate: 0,
        agencyEstimate: 0,
        currency: "€"
    }

    const [formData, setFormData] = useState(defaultFormData);

    const updateFormData = (name:string, value:any) => setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }))

    const handleInputChange = (value: string, name:string) => updateFormData(name, value);

    // Effects
    useEffect(() => {
        const rate = calculateMonthlyRate(formData.bankRate);
        updateFormData("monthlyRate", rate);
    }, [formData.bankRate]);

    useEffect(() => {
        const installments = calculateMortgageInstallments(formData.mortgageDuration);
        updateFormData("numberOfInstallments", installments);
    }, [formData.mortgageDuration]);

    useEffect(() => {
        const agencyCheck = Boolean(formData.agencyRate) && !isNaN(formData.agencyRate);
        const budgetCheck = Boolean(formData.budget) && !isNaN(formData.budget);

        if (agencyCheck && budgetCheck) {
            const agencyAmountWithoutIVA = formData.agencyRate * formData.budget / 100;
            const iva = 0.22 * agencyAmountWithoutIVA;
            updateFormData("agencyEstimate", parseFloat((agencyAmountWithoutIVA + iva).toFixed(2)));
        } else {
            updateFormData("agencyEstimate", 0);
        }
    }, [formData.mortgageDuration, formData.budget, formData.bankRate, formData.agencyRate]);


    useEffect(() => {
        const mortgageCheck: boolean = Boolean(formData.mortgage) && !isNaN(formData.mortgage);
        const budgetCheck: boolean = Boolean(formData.budget) && !isNaN(formData.budget);

        if (mortgageCheck && budgetCheck) {
            const value = getMortgageDepositEstimate(formData.budget, formData.mortgage);
            updateFormData("mortgageDepositEstimate", value)
        } else {
            updateFormData("mortgageDepositEstimate", 0);
        }
    }, [formData.mortgage, formData.budget])

    const getMortgageDepositEstimate = (housePrice:number, mortgagePerc:number) => housePrice - (housePrice * mortgagePerc / 100);

    useEffect(() => {
        const mortgageCheck: boolean = Boolean(formData.mortgage) && !isNaN(formData.mortgage);
        const budgetCheck: boolean = Boolean(formData.budget) && !isNaN(formData.budget);
        const bankAssessmentCheck: boolean = Boolean(formData.bankAssessment) && !isNaN(formData.bankAssessment);

        if (mortgageCheck && budgetCheck && bankAssessmentCheck) {
            const value = (formData.bankAssessment * (formData.budget * formData.mortgage / 100)) / 100;
            updateFormData("bankAssessmentEstimate", value)
        } else {
            updateFormData("bankAssessmentEstimate", 0);
        }

    }, [formData.mortgage, formData.budget, formData.bankAssessment])


    useEffect(() => {
        const mortgageCheck: boolean = Boolean(formData.mortgage) && !isNaN(formData.mortgage);
        const budgetCheck: boolean = Boolean(formData.budget) && !isNaN(formData.budget);
        const substituteTaxCheck: boolean = Boolean(formData.substituteTax) && !isNaN(formData.substituteTax);

        if (mortgageCheck && budgetCheck && substituteTaxCheck) {
            const value = (formData.substituteTax * (formData.budget * formData.mortgage / 100)) / 100;
            updateFormData("substituteTaxEstimate", value)
        } else {
            updateFormData("substituteTaxEstimate", 0);
        }

    }, [formData.mortgage, formData.budget, formData.substituteTax])

    useEffect(() => {
        const mortgageCheck: boolean = Boolean(formData.mortgage) && !isNaN(formData.mortgage);
        const budgetCheck: boolean = Boolean(formData.budget) && !isNaN(formData.budget);
        const brokerCheck: boolean = Boolean(formData.broker) && !isNaN(formData.broker);

        if (mortgageCheck && budgetCheck && brokerCheck) {
            const value = (formData.broker * (formData.budget * formData.mortgage / 100)) / 100;
            updateFormData("brokerEstimate", value)
        } else {
            updateFormData("brokerEstimate", 0);
        }

    }, [formData.mortgage, formData.budget, formData.broker])

    useEffect(() => {
        const notaryCheck: boolean = Boolean(formData.notary) && !isNaN(formData.notary);
        if (notaryCheck) {
            updateFormData("notaryEstimate", formData.notary)
        } else {
            updateFormData("notaryEstimate", 0);
        }

    }, [formData.notary])


    useEffect(() => {
            const monthlyRateCheck: boolean = Boolean(formData.monthlyRate) && !isNaN(formData.monthlyRate);
            const budgetCheck: boolean = Boolean(formData.budget) && !isNaN(formData.budget);
            const numberOfInstallmentsCheck: boolean = Boolean(formData.numberOfInstallments) && !isNaN(formData.numberOfInstallments);
            if (monthlyRateCheck && budgetCheck && numberOfInstallmentsCheck) {
                const value = (formData.budget - getMortgageDepositEstimate(formData.budget, formData.mortgage)) * (formData.monthlyRate *
                    (Math.pow(1 + formData.monthlyRate, formData.numberOfInstallments)) /
                    (Math.pow(1 + formData.monthlyRate, formData.numberOfInstallments) - 1))
                updateFormData("mortgagePaymentEstimate", parseFloat(value.toFixed(2)))
            } else {
                updateFormData("mortgagePaymentEstimate", 0);
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
                               value={formData.agencyRate} name={"agencyRate"} disabled={false} onChange={handleInputChange}/>
                    </div>
                    <div className="flex gap-2">
                        <Input label={t("configuration.mortgage.label")}
                               placeholder={t("configuration.mortgage.placeholder")}  symbol={"%"} inputType="text" value={formData.mortgage}
                               disabled={false} name={"mortgage"} onChange={handleInputChange}/>
                        <Input label={t("configuration.bankRate.label")}
                               placeholder={t("configuration.bankRate.placeholder")}  symbol={"%"} inputType="text" value={formData.bankRate}
                               disabled={false} name={"bankRate"} onChange={handleInputChange}/>
                        <Input label={t("configuration.monthlyRate.label")}
                               placeholder={t("configuration.monthlyRate.placeholder")}  symbol={"%"} inputType="text"
                               value={formData.monthlyRate} name={"monthlyRate"} disabled={true}/>
                        <Input label={t("configuration.mortgageDuration.label")}
                               placeholder={t("configuration.mortgageDuration.placeholder")} inputType="text" symbol={"Y"}
                               value={formData.mortgageDuration} name={"mortgageDuration"} disabled={false} onChange={handleInputChange}/>
                        <Input label={t("configuration.numberOfInstallments.label")} symbol={"N°"}
                               placeholder={t("configuration.numberOfInstallments.placeholder")} inputType="text"
                               value={formData.numberOfInstallments} name={"numberOfInstallments"} disabled={true}/>
                    </div>
                    <div className="flex gap-2">
                        <Input label={t("configuration.bankAssessment.label")}  symbol={"%"}
                               placeholder={t("configuration.bankAssessment.placeholder")} inputType="text"
                               value={formData.bankAssessment} name={"bankAssessment"} disabled={false} onChange={handleInputChange}/>
                        <Input label={t("configuration.appraisal.label")}
                               placeholder={t("configuration.appraisal.placeholder")} symbol={formData.currency} inputType="text" value={formData.appraisal} name={"appraisal"}
                               disabled={false} onChange={handleInputChange}/>
                        <Input label={t("configuration.substituteTax.label")}
                               placeholder={t("configuration.substituteTax.placeholder")} symbol={"%"} inputType="text"
                               value={formData.substituteTax} name={"substituteTax"} disabled={false} onChange={handleInputChange}/>
                        <Input label={t("configuration.fireAndExplosion.label")}
                               placeholder={t("configuration.fireAndExplosion.placeholder")} symbol={formData.currency} inputType="text"
                               value={formData.fireAndExplosion} name="fireAndExplosion" disabled={false} onChange={handleInputChange}/>
                        <Input label={t("configuration.tcmPolicy.label")}
                               placeholder={t("configuration.tcmPolicy.placeholder")} symbol={formData.currency} inputType="text" value={formData.tcmPolicy} name={"tcmPolicy"}
                               disabled={false} onChange={handleInputChange}/>
                    </div>
                    <div className="flex gap-2">
                        <Input label={t("configuration.notary.label")}
                               placeholder={t("configuration.notary.placeholder")} symbol={formData.currency} inputType="text" value={formData.notary} name={"notary"}
                               disabled={false} onChange={handleInputChange}/>
                        <Input label={t("configuration.extra.label")} placeholder={t("configuration.extra.placeholder")} symbol={formData.currency}
                               inputType="text" value={formData.extra} name={"extra"} disabled={false} onChange={handleInputChange}/>
                        <Input label={t("configuration.broker.label")}
                               placeholder={t("configuration.broker.placeholder")} symbol={"%"} inputType="text" value={formData.broker} name={"broker"}
                               disabled={false} onChange={handleInputChange}/>
                    </div>
                </Card>

                <Card title={t("budget.title")}>
                    <div className="flex gap-2">
                        <Input label={t("budget.homePrice.label")} placeholder={t("budget.homePrice.placeholder")} symbol={formData.currency}
                               inputType="text" value={formData.budget} name={"budget"} onChange={handleInputChange}/>
                    </div>
                </Card>

                <Card title={t("estimate.title")}>
                    <div className="flex gap-2">
                        <Input label={t("estimate.agency.label")} placeholder={t("estimate.agency.placeholder")} symbol={formData.currency}
                               inputType="text" value={formData.agencyEstimate} name={"agencyEstimate"} disabled={true}/>
                        <Input label={t("estimate.mortgageDeposit.label")} symbol={formData.currency}
                               placeholder={t("estimate.mortgageDeposit.placeholder")} inputType="text"
                               value={formData.mortgageDepositEstimate} name={"mortgageDepositEstimate"} disabled={true}/>
                        <Input label={t("estimate.bankAssessment.label")} symbol={formData.currency}
                               placeholder={t("estimate.bankAssessment.placeholder")} inputType="text"
                               value={formData.bankAssessmentEstimate} name={"bankAssessmentEstimate"} disabled={true}/>
                        <Input label={t("estimate.substituteTax.label")} symbol={formData.currency}
                               placeholder={t("estimate.substituteTax.placeholder")} inputType="text"
                               value={formData.substituteTaxEstimate} name={"substituteTaxEstimate"} disabled={true}/>
                        <Input label={t("estimate.broker.label")} placeholder={t("estimate.broker.placeholder")} symbol={formData.currency}
                               inputType="text" value={formData.brokerEstimate} name={"brokerEstimate"} disabled={true}/>
                        <Input label={t("estimate.notary.label")} placeholder={t("estimate.notary.placeholder")} symbol={formData.currency}
                               inputType="text" value={formData.notaryEstimate} name={"notaryEstimate"} disabled={true}/>
                        <Input label={t("estimate.initialInvestment.label")} symbol={formData.currency}
                               placeholder={t("estimate.initialInvestment.placeholder")} inputType="text"
                               value={formData.initialInvestmentEstimate} name={"initialInvestmentEstimate"} disabled={true}/>
                        <Input label={t("estimate.mortgagePayment.label")} symbol={formData.currency}
                               placeholder={t("estimate.mortgagePayment.placeholder")} inputType="text"
                               value={formData.mortgagePaymentEstimate} name={"mortgagePaymentEstimate"} disabled={true}/>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
