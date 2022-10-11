import { RangeInput } from 'components/RangeInput';
import React from 'react';
import { Formik, Form, FormikHelpers, validateYupSchema, Field } from 'formik';

import styles from './Calculator.module.scss';
import { TextInput } from 'components/TextInput';
import { Calculation } from 'components/Calculation';
import * as yup from 'yup';
import { postData } from 'service/postData';

interface Values {
  price: number;
  rate: number;
  period: number;
  monthPay: number;
  contractAmount: number;
  initialPayment: number;
}

const validationSchema = yup.object().shape({
  price: yup
  .number()
  .required('Обязательно для заполнения')
  .min(1000000, 'Минимальное значение: 1 000 000')
  .max(6000000, 'Максимальное значение: 6 000 000'),
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
            postData('https://hookb.in/eK160jgYJ6UlaRPldJ1P', values)
            setSubmitting(false);
            resetForm()
          }, 1000);
        }}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue, isValid, isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.calculation}>
              <RangeInput name="price" label="Стоимость автомобиля" min={1000000} max={6000000} step={50000} disabled={isSubmitting ? true : false}/>
              <RangeInput name="rate" label="Первоначальный взнос" min={10} max={60} disabled={isSubmitting ? true : false} >
                <Calculation
                  name="initialPayment"
                  price={values.price}
                  rate={values.rate}
                  period={values.period}
                  setFieldValue={setFieldValue}
                />
              </RangeInput>
              <RangeInput name="period" label="Срок лизинга" min={1} max={60} disabled={isSubmitting ? true : false}/>
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
                <button type="submit" className={styles.button} disabled={isSubmitting ? true : false}>
                  Оставить заявку
                </button>
            </div>
          </Form>
        )}
      </Formik>
   
  );
};
