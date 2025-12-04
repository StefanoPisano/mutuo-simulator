import type {FormField} from "@Components/interfaces/FormField.ts";

export interface FormDefinitionEstimates  {
    mortgageDepositEstimate: FormField<number>,
    bankAssessmentEstimate: FormField<number>,
    initialInvestmentEstimate: FormField<number>,
    mortgagePaymentEstimate: FormField<number>,
    substituteTaxEstimate: FormField<number>,
    brokerEstimate: FormField<number>,
    notaryEstimate: FormField<number>,
    agencyEstimate: FormField<number>,
    currency: FormField<string>
}