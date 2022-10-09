import { RangeInput } from 'components/RangeInput';
import React from 'react';
import { Formik, Form, FormikHelpers, validateYupSchema } from 'formik';

interface Values {
  price: number;
  payment: number;
  period: number;
}

export const Calculator = () => {
  return (
    <>
      <Formik
        initialValues={{
          price: 3300000,
          payment: 13,
          period: 60,
        }}
        onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values, handleSubmit, setFieldValue, handleReset }) => (
          <Form>
            <RangeInput name="price" label="Стоимость автомобиля" min={1000000} max={6000000} step={50000} />
            <RangeInput
              name="payment"
              label="Первоначальный взнос"
              min={10}
              max={60}
              step={5}
              addingText={() => {
                return (values.price * values.payment) / 100;
              }}
            />
            <RangeInput name="period" label="Срок лизинга" min={1} max={60} />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
};
