import * as React from "react";
import Input from "../UI/Input.tsx";
import Card from "../UI/Card.tsx";
import {useTranslation} from "react-i18next";
import type {FormDefinitionEstimates} from "../interfaces/FormDefinitionEstimates.ts";
import {useEffect, useState} from "react";
import type {FormField} from "../interfaces/FormField.ts";
import type {FormDefinition} from "../interfaces/FormDefinition.ts";
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

interface Props {
    inputData: FormDefinition
}


const Estimates: React.FC<Props> = ({inputData}) => {
    const {t} = useTranslation();


    const defaultEstimates: FormDefinitionEstimates = {
        mortgageDepositEstimate: {isValid: true, value: 0},
        bankAssessmentEstimate: {isValid: true, value: 0},
        substituteTaxEstimate: {isValid: true, value: 0},
        brokerEstimate: {isValid: true, value: 0},
        notaryEstimate: {isValid: true, value: 0},
        agencyEstimate: {isValid: true, value: 0},
        tcmPolicy: {isValid: true, value: 0},
        appraisal: {isValid: true, value: 0},
        fireAndExplosion: {isValid: true, value: 0},
        extra: {isValid: true, value: 0},
    }

    const [estimates, setEstimates] = useState<FormDefinitionEstimates>(defaultEstimates);

    const updateEstimatesData = (name: string, value: FormField<any>) => {
        setEstimates((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    useEffect(() => {
        if(inputData.fireAndExplosion && inputData.fireAndExplosion.isValid) {
            updateEstimatesData("fireAndExplosion", {isValid: true, value: inputData.fireAndExplosion.value})
        } else {
            updateEstimatesData("fireAndExplosion", {isValid: false, value: 0})
        }
    }, [inputData.fireAndExplosion])

    useEffect(() => {
        if(inputData.appraisal && inputData.appraisal.isValid) {
            updateEstimatesData("appraisal", {isValid: true, value: inputData.appraisal.value})
        } else {
            updateEstimatesData("appraisal", {isValid: false, value: 0})
        }
    }, [inputData.appraisal])

    useEffect(() => {
        if(inputData.extra && inputData.extra.isValid) {
            updateEstimatesData("extra", {isValid: true, value: inputData.extra.value})
        } else {
            updateEstimatesData("extra", {isValid: false, value: 0})
        }
    }, [inputData.extra])

    useEffect(() => {
        if(inputData.tcmPolicy && inputData.tcmPolicy.isValid) {
            updateEstimatesData("tcmPolicy", {isValid: true, value: inputData.tcmPolicy.value})
        } else {
            updateEstimatesData("tcmPolicy", {isValid: false, value: 0})
        }
    }, [inputData.tcmPolicy])


    useEffect(() => {
        const agencyCheck = Boolean(inputData.agencyRate.value) && inputData.agencyRate.isValid && !isNaN(inputData.agencyRate.value);
        const budgetCheck = Boolean(inputData.budget.value) && inputData.budget.isValid && !isNaN(inputData.budget.value);

        if (agencyCheck && budgetCheck) {
            const agencyAmountWithoutIVA = inputData.agencyRate.value * inputData.budget.value / 100;
            const iva = 0.22 * agencyAmountWithoutIVA;
            updateEstimatesData("agencyEstimate", {
                isValid: false,
                value: parseFloat((agencyAmountWithoutIVA + iva).toFixed(2))
            });
        } else {
            updateEstimatesData("agencyEstimate", {isValid: false, value: 0});
        }
    }, [inputData.mortgageDuration, inputData.budget, inputData.bankRate, inputData.agencyRate]);


    useEffect(() => {
        const mortgageCheck: boolean = Boolean(inputData.mortgage.value) && inputData.mortgage.isValid && !isNaN(inputData.mortgage.value);
        const budgetCheck: boolean = Boolean(inputData.budget.value) && inputData.budget.isValid && !isNaN(inputData.budget.value);

        if (mortgageCheck && budgetCheck) {
            const value = getMortgageDepositEstimate(inputData.budget.value, inputData.mortgage.value);
            updateEstimatesData("mortgageDepositEstimate", {isValid: true, value: value})
        } else {
            updateEstimatesData("mortgageDepositEstimate", {isValid: false, value: 0});
        }
    }, [inputData.mortgage, inputData.budget])

    const getMortgageDepositEstimate = (housePrice: number, mortgagePerc: number) => housePrice - (housePrice * mortgagePerc / 100);

    useEffect(() => {
        const mortgageCheck: boolean = Boolean(inputData.mortgage.value) && inputData.mortgage.isValid && !isNaN(inputData.mortgage.value);
        const budgetCheck: boolean = Boolean(inputData.budget.value) && inputData.budget.isValid && !isNaN(inputData.budget.value);
        const bankAssessmentCheck: boolean = Boolean(inputData.bankAssessment.value) && inputData.bankAssessment.isValid && !isNaN(inputData.bankAssessment.value);

        if (mortgageCheck && budgetCheck && bankAssessmentCheck) {
            const value = (inputData.bankAssessment.value * (inputData.budget.value * inputData.mortgage.value / 100)) / 100;
            updateEstimatesData("bankAssessmentEstimate", {isValid: true, value: value})
        } else {
            updateEstimatesData("bankAssessmentEstimate", {isValid: false, value: 0});
        }

    }, [inputData.mortgage, inputData.budget, inputData.bankAssessment])


    useEffect(() => {
        const mortgageCheck: boolean = Boolean(inputData.mortgage.value) && inputData.mortgage.isValid && !isNaN(inputData.mortgage.value);
        const budgetCheck: boolean = Boolean(inputData.budget.value) && inputData.budget.isValid && !isNaN(inputData.budget.value);
        const substituteTaxCheck: boolean = Boolean(inputData.substituteTax.value) && inputData.substituteTax.isValid && !isNaN(inputData.substituteTax.value);

        if (mortgageCheck && budgetCheck && substituteTaxCheck) {
            const value = (inputData.substituteTax.value * (inputData.budget.value * inputData.mortgage.value / 100)) / 100;
            updateEstimatesData("substituteTaxEstimate", {isValid: true, value: value})
        } else {
            updateEstimatesData("substituteTaxEstimate", {isValid: false, value: 0});
        }

    }, [inputData.mortgage, inputData.budget, inputData.substituteTax])

    useEffect(() => {
        const mortgageCheck: boolean = Boolean(inputData.mortgage.value) && inputData.mortgage.isValid && !isNaN(inputData.mortgage.value);
        const budgetCheck: boolean = Boolean(inputData.budget.value) && inputData.budget.isValid && !isNaN(inputData.budget.value);
        const brokerCheck: boolean = Boolean(inputData.broker.value) && inputData.broker.isValid && !isNaN(inputData.broker.value);

        if (mortgageCheck && budgetCheck && brokerCheck) {
            const value = (inputData.broker.value * (inputData.budget.value * inputData.mortgage.value / 100)) / 100;
            updateEstimatesData("brokerEstimate", {isValid: true, value: value})
        } else {
            updateEstimatesData("brokerEstimate", {isValid: false, value: 0});
        }

    }, [inputData.mortgage, inputData.budget, inputData.broker])

    useEffect(() => {
        const notaryCheck: boolean = Boolean(inputData.notary) && inputData.notary.isValid && !isNaN(inputData.notary.value);
        if (notaryCheck) {
            updateEstimatesData("notaryEstimate", {isValid: true, value: inputData.notary.value})
        } else {
            updateEstimatesData("notaryEstimate", {isValid: false, value: 0});
        }

    }, [inputData.notary])


    useEffect(() => {
            const monthlyRateCheck: boolean = Boolean(inputData.monthlyRate.value) && inputData.monthlyRate.isValid && !isNaN(inputData.monthlyRate.value);
            const budgetCheck: boolean = Boolean(inputData.budget.value) && inputData.budget.isValid && !isNaN(inputData.budget.value);
            const numberOfInstallmentsCheck: boolean = Boolean(inputData.numberOfInstallments) && inputData.numberOfInstallments.isValid && !isNaN(inputData.numberOfInstallments.value);
            const mortgageCheck: boolean = Boolean(inputData.mortgage.value) && inputData.mortgage.isValid && !isNaN(inputData.mortgage.value);

            if (monthlyRateCheck && budgetCheck && numberOfInstallmentsCheck && mortgageCheck) {
                const value = (inputData.budget.value - getMortgageDepositEstimate(inputData.budget.value, inputData.mortgage.value)) * (inputData.monthlyRate.value *
                    (Math.pow(1 + inputData.monthlyRate.value, inputData.numberOfInstallments.value)) /
                    (Math.pow(1 + inputData.monthlyRate.value, inputData.numberOfInstallments.value) - 1))

                setMortgagePaymentEstimate(parseFloat(value.toFixed(2)))
            } else {
                setMortgagePaymentEstimate(0)
            }

        },
        [inputData.monthlyRate, inputData.numberOfInstallments, inputData.mortgage, inputData.budget])

    const getInitialInvestment = (): number => {
        if (inputData.budget.value && inputData.budget.value > 0) {
            return Object.values(estimates)
                .map(v => v.value)
                .map(v => parseFloat(v))
                .filter(v => !isNaN(v))
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        } else {
            return 0
        }
    }


    const [mortgagePaymentEstimate, setMortgagePaymentEstimate] = useState(0);
    const [initialInvestment, setInitialInvestment] = useState(getInitialInvestment());

    useEffect(() => {
        setInitialInvestment(getInitialInvestment());
    }, [estimates])


    return (
        <>
            <Card title={t("estimate.title")}>
                <div className="flex gap-2">
                    <Input label={t("estimate.agency.label")} placeholder={t("estimate.agency.placeholder")}
                           symbol={inputData.currency.value}
                           inputType="text" value={estimates.agencyEstimate} name={"agencyEstimate"} disabled={true}/>
                    <Input label={t("estimate.mortgageDeposit.label")} symbol={inputData.currency.value}
                           placeholder={t("estimate.mortgageDeposit.placeholder")} inputType="text"
                           value={estimates.mortgageDepositEstimate} name={"mortgageDepositEstimate"} disabled={true}/>
                    <Input label={t("estimate.bankAssessment.label")} symbol={inputData.currency.value}
                           placeholder={t("estimate.bankAssessment.placeholder")} inputType="text"
                           value={estimates.bankAssessmentEstimate} name={"bankAssessmentEstimate"} disabled={true}/>
                    <Input label={t("estimate.substituteTax.label")} symbol={inputData.currency.value}
                           placeholder={t("estimate.substituteTax.placeholder")} inputType="text"
                           value={estimates.substituteTaxEstimate} name={"substituteTaxEstimate"} disabled={true}/>
                    <Input label={t("estimate.broker.label")} placeholder={t("estimate.broker.placeholder")}
                           symbol={inputData.currency.value}
                           inputType="text" value={estimates.brokerEstimate} name={"brokerEstimate"} disabled={true}/>
                    <Input label={t("estimate.notary.label")} placeholder={t("estimate.notary.placeholder")}
                           symbol={inputData.currency.value}
                           inputType="text" value={estimates.notaryEstimate} name={"notaryEstimate"} disabled={true}/>
                </div>

                <div className={"flex flex-auto gap-10 mt-20 justify-center"}>
                    <div className={"flex bg-yimin-blue text-center font-bold w-2/5 rounded-xl p-2 items-center"}>
                        <div className={"basis-1/5 text-antiflash-white"}><ShoppingCart fontSize={"large"}/></div>
                        <div className={"basis-3/5"}>
                            <span className={"text-antiflash-white text-2xl"}>{t("estimate.initialInvestment.label")}</span>
                            <div className={"text-coral italic text-3xl"}>{initialInvestment.toFixed(2)} {inputData.currency.value}</div>
                        </div>
                        <div className={"basis-1/5"}></div>
                    </div>

                    <div className={"flex bg-yimin-blue text-center font-bold w-2/5 rounded-xl p-2 items-center "}>
                        <div className={"basis-1/5 text-antiflash-white"}><AccountBalanceIcon fontSize={"large"}/></div>
                        <div className={"basis-3/5"}>
                            <span className={"text-antiflash-white text-2xl"}>{t("estimate.mortgagePayment.label")}</span>
                            <div className={"text-coral italic text-3xl"}>{mortgagePaymentEstimate.toFixed(2)} {inputData.currency.value}</div>
                        </div>
                        <div className={"basis-1/5"}></div>
                    </div>
                </div>

            </Card>
        </>
    )
}


export default Estimates;