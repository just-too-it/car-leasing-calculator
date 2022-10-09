import React, { FC, useState } from 'react';
import { RangeInputProps } from './RangeInput.types';
import { Field } from 'formik';

import styles from './RangeInput.module.scss';

export const RangeInput: FC<RangeInputProps> = ({ name, label, min, max, step }) => {


  return (
    <article className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <Field
        type="text"
        min={min}
        max={max}
        id={name}
        name={name}
        step={step}
        className={styles.input}
      />
      <Field
        type="range"
        min={min}
        max={max}
        id={name}
        name={name}
        step={step}
        className={styles.range}
      />
      {
        name === 'price' && <div className={styles.price}>₽</div>
      }
    </article>
  );
};
