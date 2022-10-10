import { RangeInput } from 'components/RangeInput';
import React from 'react';
import { Formik, Form, FormikHelpers, validateYupSchema, Field } from 'formik';

import styles from './Calculator.module.scss';
import { TextInput } from 'components/TextInput';
import { Calculation } from 'components/Calculation';

interface Values {
  price: number;
  rate: number;
  period: number;
  monthPay: number;
  contractAmount: number;
  initialPayment: number;
}

export const Calculator = () => {
  return (
    <>
      <Formik
        initialValues={{
          price: 3300000,
          rate: 13,
          period: 60,
          monthPay: 0,
          contractAmount: 0,
          initialPayment: 0,
        }}
        onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values, handleSubmit, setFieldValue, handleReset }) => (
          <Form className={styles.form}>
            <div className={styles.calculation}>
              <RangeInput name="price" label="Стоимость автомобиля" min={1000000} max={6000000} step={50000} />
              <RangeInput name="rate" label="Первоначальный взнос" min={10} max={60}>
                <Calculation
                  name="initialPayment"
                  price={values.price}
                  rate={values.rate}
                  period={values.period}
                  setFieldValue={setFieldValue}
                />
              </RangeInput>
              <RangeInput name="period" label="Срок лизинга" min={1} max={60} />
            </div>
            <div className={styles.information}>
              <div className={styles.info}>
                <Calculation
                  name="contractAmount"
                  price={values.price}
                  rate={values.rate}
                  period={values.period}
                  label={'Сумма договора лизинга'}
                  setFieldValue={setFieldValue}
                />
              </div>
              <div className={styles.info}>
                <Calculation
                  name="monthPay"
                  price={values.price}
                  rate={values.rate}
                  period={values.period}
                  label={'Ежемесячный платеж от'}
                  setFieldValue={setFieldValue}
                />
              </div>
              <div className={styles.info}>
                <button type="submit" className={styles.button}>
                  Оставить заявку
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
