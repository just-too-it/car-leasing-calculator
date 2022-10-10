export type RangeInputProps = {
    name: string;
    label: string;
    min: number;
    max: number;
    disabled: boolean;
    step?: number;
    children?: any;
}