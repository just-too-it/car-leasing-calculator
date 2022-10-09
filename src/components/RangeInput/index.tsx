import React, { FC, useEffect, useState } from 'react';
import { RangeInputProps } from './RangeInput.types';
import { Field } from 'formik';
import clsx from 'clsx';

import styles from './RangeInput.module.scss';

export const RangeInput: FC<RangeInputProps> = ({ name, label, min, max, step, addingText }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    addingText && setText(addingText());
  }, []);

  return (
    <article className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        {text && <div className={styles.input}>{addingText()}</div>}
        <Field
          type="text"
          min={min}
          max={max}
          id={name}
          name={name}
          step={step}
          className={name === 'payment' ? clsx(styles.input, styles.rate) : styles.input}
        />
        {name === 'payment' && <div className={styles.percent}>%</div>}
        <Field type="range" min={min} max={max} id={name} name={name} step={step} className={styles.range} />
        {name === 'price' && <div className={styles.price}>₽</div>}
      </div>
    </article>
  );
};
