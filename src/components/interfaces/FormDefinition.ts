import type {FormField} from "../interfaces/FormField.ts";

export interface FormDefinition {
    agencyRate: FormField<number>;
    bankRate: FormField<number>;
    monthlyRate: FormField<number>;
    numberOfInstallments: FormField<number>;
    mortgageDuration: FormField<number>;
    budget: FormField<number>;
    mortgage: FormField<number>;
    bankAssessment: FormField<number>;
    appraisal: FormField<number>;
    substituteTax: FormField<number>;
    fireAndExplosion: FormField<number>;
    tcmPolicy: FormField<number>;
    notary: FormField<number>;
    extra: FormField<number>;
    broker: FormField<number>;
    currency: FormField<string>;
}
