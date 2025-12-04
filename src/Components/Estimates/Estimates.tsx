import * as React from "react";
import Input from "@Components/UI/Input.tsx";
import Card from "@Components/UI/Card.tsx";
import {useTranslation} from "react-i18next";
import type {FormDefinitionEstimates} from "@Components/interfaces/FormDefinitionEstimates.ts";

interface Props {
    estimates: FormDefinitionEstimates
}

const Estimates: React.FC<Props> = ({estimates}) => {
    const {t} = useTranslation();

    return (
        <>
            <Card title={t("estimate.title")}>
                <div className="flex gap-2">
                    <Input label={t("estimate.agency.label")} placeholder={t("estimate.agency.placeholder")} symbol={estimates.currency.value}
                           inputType="text" value={estimates.agencyEstimate} name={"agencyEstimate"} disabled={true}/>
                    <Input label={t("estimate.mortgageDeposit.label")} symbol={estimates.currency.value}
                           placeholder={t("estimate.mortgageDeposit.placeholder")} inputType="text"
                           value={estimates.mortgageDepositEstimate} name={"mortgageDepositEstimate"} disabled={true}/>
                    <Input label={t("estimate.bankAssessment.label")} symbol={estimates.currency.value}
                           placeholder={t("estimate.bankAssessment.placeholder")} inputType="text"
                           value={estimates.bankAssessmentEstimate} name={"bankAssessmentEstimate"} disabled={true}/>
                    <Input label={t("estimate.substituteTax.label")} symbol={estimates.currency.value}
                           placeholder={t("estimate.substituteTax.placeholder")} inputType="text"
                           value={estimates.substituteTaxEstimate} name={"substituteTaxEstimate"} disabled={true}/>
                    <Input label={t("estimate.broker.label")} placeholder={t("estimate.broker.placeholder")} symbol={estimates.currency.value}
                           inputType="text" value={estimates.brokerEstimate} name={"brokerEstimate"} disabled={true}/>
                    <Input label={t("estimate.notary.label")} placeholder={t("estimate.notary.placeholder")} symbol={estimates.currency.value}
                           inputType="text" value={estimates.notaryEstimate} name={"notaryEstimate"} disabled={true}/>
                    <Input label={t("estimate.initialInvestment.label")} symbol={estimates.currency.value}
                           placeholder={t("estimate.initialInvestment.placeholder")} inputType="text"
                           value={estimates.initialInvestmentEstimate} name={"initialInvestmentEstimate"} disabled={true}/>
                    <Input label={t("estimate.mortgagePayment.label")} symbol={estimates.currency.value}
                           placeholder={t("estimate.mortgagePayment.placeholder")} inputType="text"
                           value={estimates.mortgagePaymentEstimate} name={"mortgagePaymentEstimate"} disabled={true}/>
                </div>
            </Card>
        </>
    )
}


export default Estimates;