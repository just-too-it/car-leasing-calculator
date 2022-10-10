export type CalculationProps = {
    name: string;
    label?: string;
    price: number;
    rate: number;
    period: number;
    setFieldValue: (x: string, y: string|number)=>void;
}