import type {FormField} from "@Components/interfaces/FormField.ts";

export interface FormDefinitionEstimates  {
    mortgageDepositEstimate: FormField<number>,
    bankAssessmentEstimate: FormField<number>,
    substituteTaxEstimate: FormField<number>,
    brokerEstimate: FormField<number>,
    notaryEstimate: FormField<number>,
    agencyEstimate: FormField<number>
    tcmPolicy: FormField<number>
    fireAndExplosion: FormField<number>
    appraisal: FormField<number>
    extra: FormField<number>
}