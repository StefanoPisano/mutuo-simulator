import * as React from "react";
import {useEffect, useState} from "react";
import Card from "../UI/Card.tsx";
import {useTranslation} from "react-i18next";
import type {FormDefinitionEstimates} from "../interfaces/FormDefinitionEstimates.ts";
import type {FormField} from "../interfaces/FormField.ts";
import type {FormDefinition} from "../interfaces/FormDefinition.ts";
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Payments from "@mui/icons-material/Payments";

interface Props {
    inputData: FormDefinition
}


const Estimates: React.FC<Props> = ({inputData}) => {
    const {t} = useTranslation();


    const defaultEstimates: FormDefinitionEstimates = {
        mortgageDepositEstimate: 0,
        bankAssessmentEstimate: 0,
        substituteTaxEstimate: 0,
        brokerEstimate: 0,
        notaryEstimate: 0,
        agencyEstimate: 0,
        tcmPolicy: 0,
        appraisal: 0,
        fireAndExplosion: 0,
        extra: 0
    }

    const [estimates, setEstimates] = useState<FormDefinitionEstimates>(defaultEstimates);

    const updateEstimatesData = (name: string, value: number) => {
        setEstimates((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const isValid = (field: FormField<any>): boolean => Boolean(field.value) && field.isValid && !isNaN(field.value)


    useEffect(() => {
        if (isValid(inputData.fireAndExplosion)) {
            updateEstimatesData("fireAndExplosion", inputData.fireAndExplosion.value)
        } else {
            updateEstimatesData("fireAndExplosion", 0)
        }

        if (isValid(inputData.appraisal)) {
            updateEstimatesData("appraisal", inputData.appraisal.value)
        } else {
            updateEstimatesData("appraisal", 0)
        }

        if (isValid(inputData.extra)) {
            updateEstimatesData("extra", inputData.extra.value)
        } else {
            updateEstimatesData("extra", 0)
        }

        if (isValid(inputData.tcmPolicy)) {
            updateEstimatesData("tcmPolicy", inputData.tcmPolicy.value)
        } else {
            updateEstimatesData("tcmPolicy", 0)
        }
    }, [inputData.fireAndExplosion, inputData.appraisal, inputData.extra, inputData.tcmPolicy])


    useEffect(() => {
        const agencyCheck = isValid(inputData.agencyRate);
        const budgetCheck = isValid(inputData.budget);

        if (agencyCheck && budgetCheck) {
            const agencyAmountWithoutIVA = inputData.agencyRate.unit === 'percentage'
                ? inputData.agencyRate.value * inputData.budget.value / 100
                :  parseFloat(String(inputData.agencyRate.value));

            const iva = 0.22 * agencyAmountWithoutIVA;
            updateEstimatesData("agencyEstimate", Number((agencyAmountWithoutIVA + iva).toFixed(2)));
        } else {
            updateEstimatesData("agencyEstimate", 0);
        }
    }, [inputData.mortgageDuration, inputData.budget, inputData.bankRate, inputData.agencyRate]);


    useEffect(() => {
        const mortgageCheck: boolean = isValid(inputData.mortgage);
        const budgetCheck: boolean = isValid(inputData.budget);

        if (mortgageCheck && budgetCheck) {
            const value = getMortgageDepositEstimate(inputData.budget.value, inputData.mortgage.value);
            updateEstimatesData("mortgageDepositEstimate", value)
        } else {
            updateEstimatesData("mortgageDepositEstimate", 0);
        }
    }, [inputData.mortgage, inputData.budget])

    const getMortgageDepositEstimate = (housePrice: number, mortgagePerc: number) => housePrice - (housePrice * mortgagePerc / 100);

    useEffect(() => {
        const mortgageCheck: boolean = isValid(inputData.mortgage);
        const budgetCheck: boolean = isValid(inputData.budget);
        const bankAssessmentCheck: boolean = isValid(inputData.bankAssessment);

        if (mortgageCheck && budgetCheck && bankAssessmentCheck) {
            const value: number = inputData.bankAssessment.unit === 'percentage'
                ? (inputData.bankAssessment.value * (inputData.budget.value * inputData.mortgage.value / 100)) / 100
                : inputData.bankAssessment.value;
            updateEstimatesData("bankAssessmentEstimate", parseFloat(String(value)))
        } else {
            updateEstimatesData("bankAssessmentEstimate", 0);
        }

    }, [inputData.mortgage, inputData.budget, inputData.bankAssessment])


    useEffect(() => {
        const mortgageCheck: boolean = isValid(inputData.mortgage);
        const budgetCheck: boolean = isValid(inputData.budget);
        const substituteTaxCheck: boolean = isValid(inputData.substituteTax);

        if (mortgageCheck && budgetCheck && substituteTaxCheck) {
            const value = (inputData.substituteTax.value * (inputData.budget.value * inputData.mortgage.value / 100)) / 100;
            updateEstimatesData("substituteTaxEstimate", value)
        } else {
            updateEstimatesData("substituteTaxEstimate", 0);
        }

    }, [inputData.mortgage, inputData.budget, inputData.substituteTax])

    useEffect(() => {
        const mortgageCheck: boolean = isValid(inputData.mortgage);
        const budgetCheck: boolean = isValid(inputData.budget);
        const brokerCheck: boolean = isValid(inputData.broker);

        if (mortgageCheck && budgetCheck && brokerCheck) {
            const value = inputData.broker.unit === 'percentage'
                ? (inputData.broker.value * (inputData.budget.value * inputData.mortgage.value / 100)) / 100
                :  inputData.broker.value;

            updateEstimatesData("brokerEstimate", parseFloat(String(value)))
        } else {
            updateEstimatesData("brokerEstimate", 0);
        }

    }, [inputData.mortgage, inputData.budget, inputData.broker])

    useEffect(() => {
        const notaryCheck: boolean = isValid(inputData.notary);
        if (notaryCheck) {
            updateEstimatesData("notaryEstimate", parseFloat(String(inputData.notary.value)))
        } else {
            updateEstimatesData("notaryEstimate", 0);
        }

    }, [inputData.notary])


    useEffect(() => {
            const monthlyRateCheck: boolean = isValid(inputData.monthlyRate);
            const budgetCheck: boolean = isValid(inputData.budget);
            const numberOfInstallmentsCheck: boolean = isValid(inputData.numberOfInstallments);
            const mortgageCheck: boolean = isValid(inputData.mortgage);

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
        if (inputData.budget.value && parseFloat(String(inputData.budget.value)) > 0) {
            return Object.values(estimates)
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

    type EstimateKeys = keyof FormDefinitionEstimates;
    const estimatesData: Array<{ key: EstimateKeys; label: string }> = [
        {
            key: "agencyEstimate",
            label: "agency.label",
        },
        {
            key: "mortgageDepositEstimate",
            label: "mortgageDeposit.label",
        },
        {
            key: "bankAssessmentEstimate",
            label: "bankAssessment.label",
        },
        {
            key: "substituteTaxEstimate",
            label: "substituteTax.label",
        },
        {
            key: "brokerEstimate",
            label: "broker.label",
        },
        {
            key: "notaryEstimate",
            label: "notary.label",
        },
    ];

    return (
        <>
            <Card title={t("estimate.title")}>
                <div className={"flex flex-auto gap-5 mt-10 justify-center"}>
                    {estimatesData.map(({key, label}) => (
                        <div key={key}
                             className={"flex flex-col bg-yimin-blue text-center font-bold w-1/6 rounded-xl p-2 items-center"}>
                            <span className={"text-antiflash-white text-xs"}>{t(`estimate.${label}`)}</span>
                            <div className={"text-coral italic text-xl"}>
                                {estimates[key].toFixed(2)} <Payments />
                            </div>
                        </div>
                    ))}

                </div>

                <div className={"flex flex-auto gap-10 mt-20 justify-center"}>
                    <div className={"flex bg-yimin-blue text-center font-bold w-2/5 rounded-xl p-2 items-center"}>
                        <div className={"basis-1/5 text-antiflash-white"}><ShoppingCart fontSize={"large"}/></div>
                        <div className={"basis-3/5"}>
                            <span
                                className={"text-antiflash-white text-2xl"}>{t("estimate.initialInvestment.label")}</span>
                            <div
                                className={"text-coral italic text-3xl"}>~ {initialInvestment.toFixed(2)} <Payments fontSize={"large"}/></div>
                        </div>
                        <div className={"basis-1/5"}></div>
                    </div>

                    <div className={"flex bg-yimin-blue text-center font-bold w-2/5 rounded-xl p-2 items-center "}>
                        <div className={"basis-1/5 text-antiflash-white"}><AccountBalanceIcon fontSize={"large"}/></div>
                        <div className={"basis-3/5"}>
                            <span
                                className={"text-antiflash-white text-2xl"}>{t("estimate.mortgagePayment.label")}</span>
                            <div
                                className={"text-coral italic text-3xl"}>~ {mortgagePaymentEstimate.toFixed(2)} <Payments fontSize={"large"}/></div>
                        </div>
                        <div className={"basis-1/5"}></div>
                    </div>
                </div>

            </Card>
        </>
    )
}


export default Estimates;