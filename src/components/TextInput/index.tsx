import React, { FC, useEffect, useState } from 'react';
import { Field } from 'formik';
import clsx from 'clsx';

import styles from './TextInput.module.scss';

export const TextInput = ({ name, label, payment, price }) => {
const [value, setValue] = useState(0)
    const getMonthPay = (price, initial, months) => {
        return  (price - initial) * ((0.035 * Math.pow((1 + 0.035), months)) / (Math.pow((1 + 0.035), months) - 1));
      }

      //Math.ceil(getMonthPay(values.price, getInitialPayment(values.price, values.rate), values.period)).toLocaleString()
  
useEffect(()=>{
  setValue(price*2)
},[price])

  return (
    <article className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        {payment && <div className={styles.input}>{payment.toLocaleString()}</div>}
        <Field
          type="text"
          id={name}
          name={name}
          className={styles.input}
          value={value}
        />
      </div>
    </article>
  );
};
