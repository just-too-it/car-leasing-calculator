// export const enum INPUT_NAME {
//     'price',
//     'payment',
//     'period'
// }

export type RangeInputProps = {
    name: string;
    label: string;
    min: number;
    max: number;
    step?: number;
    addingText?: any
    // typeInput: INPUT_NAME.price | INPUT_NAME.payment | INPUT_NAME.period;
}