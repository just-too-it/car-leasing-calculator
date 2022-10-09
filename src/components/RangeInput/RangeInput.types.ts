export const enum TYPE_INPUT {
    'price',
    'payment',
    'period'
}

export type RangeInputProps = {
    name: string;
    label: string;
    defaultValue: number;
    min: number;
    max: number;
    step?: number;
    typeInput: TYPE_INPUT.price | TYPE_INPUT.payment | TYPE_INPUT.period;
}