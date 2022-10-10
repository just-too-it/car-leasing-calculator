import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { CalculationProps } from './Calculation.types';
import { Field } from 'formik';

import styles from './Calculation.module.scss';
import clsx from 'clsx';

export const Calculation: FC<CalculationProps> = ({ name, label, price, rate, period, setFieldValue }) => {
  const INTEREST_RATE = 0.035;
  const [value, setValue] = useState('');
  const [monthPay, setMonthPay] = useState(0);
  const [amount, setAmout] = useState(0);

  const initPay = useMemo(() => {
    return Math.ceil((price * rate) / 100);
  }, [price, rate]);

  const getMonthPayment = useCallback(
    (price, period) => {
      return Math.ceil(
        (price - initPay) *
          ((INTEREST_RATE * Math.pow(1 + INTEREST_RATE, period)) / (Math.pow(1 + INTEREST_RATE, period) - 1))
      );
    },
    [initPay, price, period]
  );

  const getAmount = useCallback(
    (period) => {
      return Math.ceil(initPay + period * monthPay);
    },
    [initPay, period, monthPay]
  );

  useEffect(() => {
    setMonthPay(getMonthPayment(price, period));
    setAmout(getAmount(period));

    switch (name) {
      case 'initialPayment':
        setFieldValue(name, initPay);
        setValue(`${initPay.toLocaleString()} ₽`);
        break;
      case 'monthPay':
        setValue(`${monthPay.toLocaleString()} ₽`);
        setFieldValue(name, monthPay);
        break;
      case 'contractAmount':
        setValue(`${amount.toLocaleString()} ₽`);
        setFieldValue(name, amount);
        break;

      default:
        break;
    }
  }, [name, initPay, monthPay, amount, price, period]);

  return (
    <>
      {name === 'initialPayment' ? (
        <article className={clsx(styles.wrapper, styles.wrapperInit)}>
          <Field type="text" id={name} name={name} className={clsx(styles.input, styles.init)} value={value} disabled />
        </article>
      ) : (
        <article className={styles.wrapper}>
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
            <div className={styles.inputWrapper}>
              <Field type="text" id={name} name={name} className={styles.input} value={value} disabled />
            </div>
        </article>
      )}
    </>
  );
};

