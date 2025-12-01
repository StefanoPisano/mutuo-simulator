import * as React from "react";
import SideBar from "@Components/Dashboard/SideBar/SideBar.tsx";
import styles from "./dashboard.module.scss";
import Card from "@Components/UI/Card.tsx";
import Input from "@Components/UI/Input.tsx";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

const Dashboard: React.FC = () => {
    const {t} = useTranslation();

    // Configuration states
    const [agencyRate, setAgencyRate] = useState("4");
    const [bankRate, setBankRate] = useState("2.98");
    const [monthlyRate, setMonthlyRate] = useState("");
    const [numberOfInstallments, setNumberOfInstallments] = useState("");
    const [mortgageDuration, setMortgageDuration] = useState("30");
    const [budget, setBudget] = useState("");
    const [agency, setAgency] = useState("- €");

    // Additional input states
    const [mortgage, setMortgage] = useState("80");
    const [bankAssessment, setBankAssessment] = useState("1");
    const [appraisal, setAppraisal] = useState("350");
    const [substituteTax, setSubstituteTax] = useState("0.25");
    const [fireAndExplosion, setFireAndExplosion] = useState("2177");
    const [tcmPolicy, setTcmPolicy] = useState("5000");
    const [notary, setNotary] = useState("5000");
    const [extra, setExtra] = useState("");
    const [broker, setBroker] = useState("1");

    // Estimate section states
    const [mortgageDepositEstimate, setMortgageDepositEstimate] = useState("");
    const [bankAssessmentEstimate, setBankAssessmentEstimate] = useState("");
    const [initialInvestmentEstimate, setInitialInvestmentEstimate] = useState("");
    const [mortgagePaymentEstimate, setMortgagePaymentEstimate] = useState("");
    const [substituteTaxEstimate, setSubstituteTaxEstimate] = useState("");
    const [brokerEstimate, setBrokerEstimate] = useState("");
    const [notaryEstimate, setNotaryEstimate] = useState("");

    // Handlers
    const handleAgencyRateChange = (value: string) => setAgencyRate(value);
    const handleBankRateChange = (value: string) => setBankRate(value);
    const handlemortgageDurationChange = (value: string) => setMortgageDuration(value);
    const handleBudgetChange = (value: string) => setBudget(value);

    const handleMortgageChange = (value: string) => setMortgage(value);
    const handleBankAssessmentChange = (value: string) => setBankAssessment(value);
    const handleAppraisalChange = (value: string) => setAppraisal(value);
    const handleSubstituteTaxChange = (value: string) => setSubstituteTax(value);
    const handleFireAndExplosionChange = (value: string) => setFireAndExplosion(value);
    const handleTcmPolicyChange = (value: string) => setTcmPolicy(value);
    const handleNotaryChange = (value: string) => setNotary(value);
    const handleExtraChange = (value: string) => setExtra(value);
    const handleBrokerChange = (value: string) => setBroker(value);


    // Effects
    useEffect(() => {
        const rate = calculateMonthlyRate(parseFloat(bankRate));
        setMonthlyRate(rate.toString());
    }, [bankRate]);

    useEffect(() => {
        const installments = calculateMortgageInstallments(parseInt(mortgageDuration));
        setNumberOfInstallments(installments.toString());
    }, [mortgageDuration]);

    useEffect(() => {
        const agencyCheck = agencyRate && !isNaN(parseFloat(agencyRate));
        const budgetCheck = budget && !isNaN(parseFloat(budget));

        if (agencyCheck && budgetCheck) {
            const agencyAmountWithoutIVA = agencyRate * budget / 100;
            const iva = 0.22 * agencyAmountWithoutIVA;
            setAgency((agencyAmountWithoutIVA + iva).toFixed(2) + " €");
        } else {
            setAgency("- €");
        }
    }, [mortgageDuration, budget, bankRate, agencyRate]);


    useEffect(() => {
        const mortgageCheck: boolean = mortgage && !isNaN(parseFloat(mortgage));
        const budgetCheck: boolean = budget && !isNaN(parseFloat(budget));

        if (mortgageCheck && budgetCheck) {
            const value = getMortgageDepositEstimate(budget, mortgage);
            setMortgageDepositEstimate(value + " €")
        } else {
            setMortgageDepositEstimate("- €");
        }
    }, [mortgage, budget])

    const getMortgageDepositEstimate = (housePrice, mortgagePerc) => housePrice - (housePrice * mortgagePerc / 100);

    useEffect(() => {
        const mortgageCheck: boolean = mortgage && !isNaN(parseFloat(mortgage));
        const budgetCheck: boolean = budget && !isNaN(parseFloat(budget));
        const bankAssessmentCheck: boolean = bankAssessment && !isNaN(parseFloat(bankAssessment));

        if (mortgageCheck && budgetCheck && bankAssessmentCheck) {
            const value = (bankAssessment * (budget * mortgage / 100)) / 100;
            setBankAssessmentEstimate(value + " €")
        } else {
            setBankAssessmentEstimate("- €");
        }

    }, [mortgage, budget, bankAssessment])


    useEffect(() => {
        const mortgageCheck: boolean = mortgage && !isNaN(parseFloat(mortgage));
        const budgetCheck: boolean = budget && !isNaN(parseFloat(budget));
        const substituteTaxCheck: boolean = substituteTax && !isNaN(parseFloat(substituteTax));

        if (mortgageCheck && budgetCheck && substituteTaxCheck) {
            const value = (substituteTax * (budget * mortgage / 100)) / 100;
            setSubstituteTaxEstimate(value + " €")
        } else {
            setSubstituteTaxEstimate("- €");
        }

    }, [mortgage, budget, substituteTax])

    useEffect(() => {
        const mortgageCheck: boolean = mortgage && !isNaN(parseFloat(mortgage));
        const budgetCheck: boolean = budget && !isNaN(parseFloat(budget));
        const brokerCheck: boolean = broker && !isNaN(parseFloat(broker));

        if (mortgageCheck && budgetCheck && brokerCheck) {
            const value = (broker * (budget * mortgage / 100)) / 100;
            setBrokerEstimate(value + " €")
        } else {
            setBrokerEstimate("- €");
        }

    }, [mortgage, budget, broker])

    useEffect(() => {
        const notaryCheck: boolean = notary && !isNaN(parseFloat(notary));
        if (notaryCheck) {
            setNotaryEstimate(notary + " €")
        } else {
            setNotaryEstimate("- €");
        }

    }, [notary])


    useEffect(() => {
            const monthlyRateCheck: boolean = monthlyRate && !isNaN(parseFloat(monthlyRate));
            const budgetCheck: boolean = budget && !isNaN(parseFloat(budget));
            const numberOfInstallmentsCheck: boolean = numberOfInstallments && !isNaN(parseFloat(numberOfInstallments));
            if (monthlyRateCheck && budgetCheck && numberOfInstallmentsCheck) {
                const value = (budget - getMortgageDepositEstimate(budget, mortgage)) * (monthlyRate *
                    (Math.pow(1 + parseFloat(monthlyRate), parseFloat(numberOfInstallments))) /
                    (Math.pow(1 + parseFloat(monthlyRate), parseFloat(numberOfInstallments)) - 1))
                setMortgagePaymentEstimate(value.toFixed(2) + " €")
            } else {
                setMortgagePaymentEstimate("- €");
            }

        },
        [monthlyRate, numberOfInstallments, mortgage, budget])


    // Calculation helpers
    const calculateMortgageInstallments = (duration: number) => {
        return duration ? (duration * 12).toFixed(0) : "Invalid mortgage Duration";
    };

    const calculateMonthlyRate = (bankRate: number) => {
        return bankRate ? bankRate / 100 / 12 : 0;
    };

    return (
        <div className="w-full h-full flex flex-row gap-10">
            <div className="basis-24">
                <SideBar/>
            </div>
            <div className={"p-8 basis-full border-french-gray rounded-2xl border " + styles.bgDashboard}>
                <Card title={t("configuration.title")}>
                    <div className="flex gap-2">
                        <Input label={t("configuration.realEstateAgency.label")}
                               placeholder={t("configuration.realEstateAgency.placeholder")} inputType="text"
                               value={agencyRate} disabled={false} onChange={handleAgencyRateChange}/>
                    </div>
                    <div className="flex gap-2">
                        <Input label={t("configuration.mortgage.label")}
                               placeholder={t("configuration.mortgage.placeholder")} inputType="text" value={mortgage}
                               disabled={false} onChange={handleMortgageChange}/>
                        <Input label={t("configuration.bankRate.label")}
                               placeholder={t("configuration.bankRate.placeholder")} inputType="text" value={bankRate}
                               disabled={false} onChange={handleBankRateChange}/>
                        <Input label={t("configuration.monthlyRate.label")}
                               placeholder={t("configuration.monthlyRate.placeholder")} inputType="text"
                               value={monthlyRate} disabled={true}/>
                        <Input label={t("configuration.mortgageDuration.label")}
                               placeholder={t("configuration.mortgageDuration.placeholder")} inputType="text"
                               value={mortgageDuration} disabled={false} onChange={handlemortgageDurationChange}/>
                        <Input label={t("configuration.numberOfInstallments.label")}
                               placeholder={t("configuration.numberOfInstallments.placeholder")} inputType="text"
                               value={numberOfInstallments} disabled={true}/>
                    </div>
                    <div className="flex gap-2">
                        <Input label={t("configuration.bankAssessment.label")}
                               placeholder={t("configuration.bankAssessment.placeholder")} inputType="text"
                               value={bankAssessment} disabled={false} onChange={handleBankAssessmentChange}/>
                        <Input label={t("configuration.appraisal.label")}
                               placeholder={t("configuration.appraisal.placeholder")} inputType="text" value={appraisal}
                               disabled={false} onChange={handleAppraisalChange}/>
                        <Input label={t("configuration.substituteTax.label")}
                               placeholder={t("configuration.substituteTax.placeholder")} inputType="text"
                               value={substituteTax} disabled={false} onChange={handleSubstituteTaxChange}/>
                        <Input label={t("configuration.fireAndExplosion.label")}
                               placeholder={t("configuration.fireAndExplosion.placeholder")} inputType="text"
                               value={fireAndExplosion} disabled={false} onChange={handleFireAndExplosionChange}/>
                        <Input label={t("configuration.tcmPolicy.label")}
                               placeholder={t("configuration.tcmPolicy.placeholder")} inputType="text" value={tcmPolicy}
                               disabled={false} onChange={handleTcmPolicyChange}/>
                    </div>
                    <div className="flex gap-2">
                        <Input label={t("configuration.notary.label")}
                               placeholder={t("configuration.notary.placeholder")} inputType="text" value={notary}
                               disabled={false} onChange={handleNotaryChange}/>
                        <Input label={t("configuration.extra.label")} placeholder={t("configuration.extra.placeholder")}
                               inputType="text" value={extra} disabled={false} onChange={handleExtraChange}/>
                        <Input label={t("configuration.broker.label")}
                               placeholder={t("configuration.broker.placeholder")} inputType="text" value={broker}
                               disabled={false} onChange={handleBrokerChange}/>
                    </div>
                </Card>

                <Card title={t("budget.title")}>
                    <div className="flex gap-2">
                        <Input label={t("budget.homePrice.label")} placeholder={t("budget.homePrice.placeholder")}
                               inputType="text" value={budget} onChange={handleBudgetChange}/>
                    </div>
                </Card>

                <Card title={t("estimate.title")}>
                    <div className="flex gap-2">
                        <Input label={t("estimate.agency.label")} placeholder={t("estimate.agency.placeholder")}
                               inputType="text" value={agency} disabled={true}/>
                        <Input label={t("estimate.mortgageDeposit.label")}
                               placeholder={t("estimate.mortgageDeposit.placeholder")} inputType="text"
                               value={mortgageDepositEstimate} disabled={true}/>
                        <Input label={t("estimate.bankAssessment.label")}
                               placeholder={t("estimate.bankAssessment.placeholder")} inputType="text"
                               value={bankAssessmentEstimate} disabled={true}/>
                        <Input label={t("estimate.substituteTax.label")}
                               placeholder={t("estimate.substituteTax.placeholder")} inputType="text"
                               value={substituteTaxEstimate} disabled={true}/>
                        <Input label={t("estimate.broker.label")} placeholder={t("estimate.broker.placeholder")}
                               inputType="text" value={brokerEstimate} disabled={true}/>
                        <Input label={t("estimate.notary.label")} placeholder={t("estimate.notary.placeholder")}
                               inputType="text" value={notaryEstimate} disabled={true}/>
                        <Input label={t("estimate.initialInvestment.label")}
                               placeholder={t("estimate.initialInvestment.placeholder")} inputType="text"
                               value={initialInvestmentEstimate} disabled={true}/>
                        <Input label={t("estimate.mortgagePayment.label")}
                               placeholder={t("estimate.mortgagePayment.placeholder")} inputType="text"
                               value={mortgagePaymentEstimate} disabled={true}/>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
