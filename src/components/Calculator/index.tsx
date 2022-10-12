import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';

import { RangeInput } from 'components/RangeInput';
import { Calculation } from 'components/Calculation';
import { postData } from 'service/postData';

import styles from './Calculator.module.scss';

interface Values {
  price: number;
  rate: number;
  period: number;
  monthPay: number;
  contractAmount: number;
  initialPayment: number;
}

const validationSchema = yup.object().shape({
  price: yup.number().min(1000000, 'Минимальное значение: 1 000 000').max(6000000, 'Максимальное значение: 6 000 000'),
  rate: yup.number().min(10, 'Минимальное значение: 10%').max(60, 'Максимальное значение: 60%'),
  period: yup.number().min(1, 'Минимальное значение: 1 месяц').max(60, 'Максимальное значение: 60 месяцев'),
});

export const Calculator = () => {
  return (
    <Formik
      initialValues={{
        price: 3300000,
        rate: 13,
        period: 60,
        monthPay: 0,
        contractAmount: 0,
        initialPayment: 0,
      }}
      validateOnChange={true}
      validateOnBlur={false}
      onSubmit={(values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
        setTimeout(async () => {
          console.log(JSON.stringify(values, null, 2));
          postData('https://hookb.in/eK160jgYJ6UlaRPldJ1P', values);
          setSubmitting(false);
          resetForm();
        }, 500);
      }}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.calculation}>
            <RangeInput
              name="price"
              label="Стоимость автомобиля"
              min={1000000}
              max={6000000}
              step={50000}
              disabled={isSubmitting ? true : false}
            />
            <RangeInput
              name="rate"
              label="Первоначальный взнос"
              min={10}
              max={60}
              disabled={isSubmitting ? true : false}
            >
              <Calculation
                name="initialPayment"
                price={values.price}
                rate={values.rate}
                period={values.period}
                setFieldValue={setFieldValue}
              />
            </RangeInput>
            <RangeInput name="period" label="Срок лизинга" min={1} max={60} disabled={isSubmitting ? true : false} />
          </div>
          <div className={styles.information}>
            <Calculation
              name="contractAmount"
              price={values.price}
              rate={values.rate}
              period={values.period}
              label={'Сумма договора лизинга'}
              setFieldValue={setFieldValue}
            />
            <Calculation
              name="monthPay"
              price={values.price}
              rate={values.rate}
              period={values.period}
              label={'Ежемесячный платеж от'}
              setFieldValue={setFieldValue}
            />
            <button
              type="submit"
              className={isSubmitting ? clsx(styles.button, styles.spinner) : styles.button}
              disabled={isSubmitting ? true : false}
            >
              Оставить заявку
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
