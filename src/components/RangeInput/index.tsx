import React, { FC, useEffect, useRef } from 'react';
import { Field } from 'formik';
import clsx from 'clsx';

import { RangeInputProps } from './RangeInput.types';

import styles from './RangeInput.module.scss';

export const RangeInput: FC<RangeInputProps> = ({ name, label, min, max, step, disabled, children }) => {
  const inpuRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (Number(inpuRef.current.value) > max) {
      inpuRef.current.value = max.toString();
    }
    if (Number(inpuRef.current.value) < min) {
      inpuRef.current.value = min.toString();
    }
  });

  return (
    <article className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div className={disabled ? clsx(styles.inputWrapper, styles.disabled) : styles.inputWrapper}>
        {name === 'rate' && <div>{children}</div>}
        <Field
          type="number"
          pattern="[0-9]*"
          min={min}
          max={max}
          id={name}
          name={name}
          step={step}
          disabled={disabled}
          className={name === 'rate' ? clsx(styles.input, styles.rate) : styles.input}
          innerRef={inpuRef}
        />
        <Field
          type="range"
          min={min}
          max={max}
          id={name}
          name={name}
          step={step}
          className={styles.range}
          disabled={disabled}
        />
        {name === 'rate' && <div className={styles.percent}>%</div>}
        {name === 'price' && <div className={styles.price}>₽</div>}
        {name === 'period' && <div className={styles.price}>мес.</div>}
      </div>
    </article>
  );
};
