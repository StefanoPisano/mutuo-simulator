export interface FormField<T extends string | number> {
    isValid: boolean;
    value: T;
}
