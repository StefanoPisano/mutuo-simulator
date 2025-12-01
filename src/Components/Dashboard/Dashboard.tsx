import * as React from "react";
import SideBar from "@Components/Dashboard/SideBar/SideBar.tsx";
import styles from "./dashboard.module.scss";
import Card from "@Components/UI/Card.tsx";
import Input from "@Components/UI/Input.tsx";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

const Dashboard: React.FC = () => {
    const { t } = useTranslation();

    const [agencyRate, setAgencyRate] = useState("4");
    const [bankRate, setBankRate] = useState("2.98");
    const [monthlyRate, setMonthlyRate] = useState("");
    const [numberOfInstallments, setNumberOfInstallments] = useState("");
    const [mortageDuration, setMortageDuration] = useState("30")
    const [budget, setBudget] = useState("")
    const [agency, setAgency] = useState("- €")

    const handleAgencyRateChange = (agencyRate:string) => {
        setAgencyRate(agencyRate);
    }

    const handleBankRateChange = (bankRate:string) => {
        setBankRate(bankRate);
    }

    const handleMortageDurationChange = (duration:string) => {
        setMortageDuration(duration);
    }

    const handleBudgetChange = (budget:string) => {
        setBudget(budget);
    }

    useEffect(() => {
        const rate = calculateMonthlyRate(parseFloat(bankRate));

        setMonthlyRate(rate.toString())
    }, [bankRate]);

    useEffect(() => {
        const numberOfInstallments = calculateMortageInstallments(parseInt(mortageDuration))
        setNumberOfInstallments(numberOfInstallments.toString());
    }, [mortageDuration])


    const calculateMortageInstallments = (duration:number) => {
        return duration ? (duration * 12).toFixed(0) : "Invalid Mortage Duration";
    }

    const calculateMonthlyRate = (bankRate:number) => {
        return bankRate ? bankRate / 100 / 12 : "Invalid Bank Rate"
    }


    useEffect(() => {
        const agencyCheck = agencyRate && !isNaN(parseFloat(agencyRate));
        const budgetCheck =  budget && !isNaN(parseFloat(budget))

        if(agencyCheck && budgetCheck) {
            const agencyAmountWithoutIVA = parseFloat(agencyRate) * parseFloat(budget) / 100;
            const iva = 0.22 * agencyAmountWithoutIVA;

            setAgency((agencyAmountWithoutIVA + iva) + " €")
        } else {
            setAgency("- €")
        }

    }, [mortageDuration, budget, bankRate, agencyRate])

    return (
        <>
            <div className={"w-full h-full flex flex-row gap-10"}>
                <div className={"basis-24"}>
                    <SideBar/>
                </div>
                <div className={"p-8 basis-full border-french-gray rounded-2xl border " + styles.bgDashboard}>
                    <Card  title={t("configuration.title")}>
                        <div className={"flex gap-2"}>
                            <Input label={t("configuration.realEstateAgency.label")} placeholder={t("configuration.realEstateAgency.placeholder")} inputType={"text"} value={agencyRate} disabled={false} onChange={handleAgencyRateChange}/>
                        </div>
                        <div className={"flex gap-2"}>
                            <Input label={t("configuration.mortgage.label")} placeholder={t("configuration.mortgage.placeholder")} inputType={"text"} value={"80"} disabled={false}/>
                            <Input label={t("configuration.bankRate.label")} placeholder={t("configuration.bankRate.placeholder")} inputType={"text"} value={bankRate} disabled={false} onChange={handleBankRateChange}/>
                            <Input label={t("configuration.monthlyRate.label")} placeholder={t("configuration.monthlyRate.placeholder")} inputType={"text"} value={monthlyRate} disabled={true}/>
                            <Input label={t("configuration.mortgageDuration.label")} placeholder={t("configuration.mortgageDuration.placeholder")} inputType={"text"} value={mortageDuration} disabled={false}  onChange={handleMortageDurationChange}/>
                            <Input label={t("configuration.numberOfInstallments.label")} placeholder={t("configuration.numberOfInstallments.placeholder")} inputType={"text"} value={numberOfInstallments} disabled={true}/>
                        </div>
                        <div className={"flex gap-2"}>
                            <Input label={t("configuration.underwriting.label")} placeholder={t("configuration.underwriting.placeholder")} inputType={"text"} value={"1"} disabled={false}/>
                            <Input label={t("configuration.appraisal.label")} placeholder={t("configuration.appraisal.placeholder")} inputType={"text"} value={"350"} disabled={false}/>
                            <Input label={t("configuration.substituteTax.label")} placeholder={t("configuration.substituteTax.placeholder")} inputType={"text"} value={"0.25"} disabled={false}/>
                            <Input label={t("configuration.fireAndExplosion.label")} placeholder={t("configuration.fireAndExplosion.placeholder")} inputType={"text"} value={"2177"} disabled={false}/>
                            <Input label={t("configuration.tcmPolicy.label")} placeholder={t("configuration.tcmPolicy.placeholder")} inputType={"text"} value={"5000"} disabled={false}/>
                        </div>
                        <div className={"flex gap-2"}>
                            <Input label={t("configuration.notary.label")} placeholder={t("configuration.notary.placeholder")} inputType={"text"} value={"5000"} disabled={false}/>
                            <Input label={t("configuration.extra.label")} placeholder={t("configuration.extra.placeholder")} inputType={"text"} disabled={false}/>
                            <Input label={t("configuration.broker.label")} placeholder={t("configuration.broker.placeholder")} inputType={"text"} value={"1"} disabled={false}/>
                        </div>
                    </Card>
                    <Card  title={t("budget.title")}>
                        <div className={"flex gap-2"}>
                            <Input label={t("budget.homePrice.label")} placeholder={t("budget.homePrice.placeholder")} inputType={"text"} value={budget} onChange={handleBudgetChange}/>
                        </div>
                    </Card>

                    <Card  title={t("estimate.title")}>
                        <div className={"flex gap-2"}>
                            <Input label={t("estimate.agency.label")} placeholder={t("estimate.agency.placeholder")} inputType={"text"} value={agency} disabled={true}/>
                            <Input label={t("estimate.mortageDeposit.label")} placeholder={t("estimate.mortageDeposit.placeholder")} inputType={"text"} disabled={true}/>
                            <Input label={t("estimate.bankAssessment.label")} placeholder={t("estimate.bankAssessment.placeholder")} inputType={"text"} disabled={true}/>
                            <Input label={t("estimate.substituteTax.label")} placeholder={t("estimate.substituteTax.placeholder")} inputType={"text"} disabled={true}/>
                            <Input label={t("estimate.broker.label")} placeholder={t("estimate.broker.placeholder")} inputType={"text"} disabled={true}/>
                            <Input label={t("estimate.notary.label")} placeholder={t("estimate.notary.placeholder")} inputType={"text"} disabled={true}/>
                            <Input label={t("estimate.initialInvestment.label")} placeholder={t("estimate.initialInvestment.placeholder")} inputType={"text"} disabled={true}/>
                            <Input label={t("estimate.mortagePayment.label")} placeholder={t("estimate.mortagePayment.placeholder")} inputType={"text"} disabled={true}/>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Dashboard