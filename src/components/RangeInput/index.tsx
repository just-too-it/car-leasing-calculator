import React, { FC, useState } from 'react';
import { RangeInputProps, TYPE_INPUT } from './RangeInput.types';

import styles from './RangeInput.module.scss';

export const RangeInput: FC<{ initialState: RangeInputProps }> = ({ initialState }) => {
  const { name, label, min, max, defaultValue, typeInput, step = 50000 } = initialState;
  const [value, setValue] = useState<number>(defaultValue);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = parseInt(event.target.value);
    // if (eventValue > max) setValue(max);
    // if (eventValue < min) setValue(min)
    setValue(eventValue);
  };
  return (
    <article className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type="text"
        /* value={typeInput === TYPE_INPUT.payment ? `${value.toLocaleString()} ₽` : value.toLocaleString()} */
        value={value}
        onChange={handleChangeInput}
        min={min}
        max={max}
        id={name}
        name={name}
        step={step}
     /*    pattern="[1-9]" */
        className={styles.input}
      />
      <input
        type="range"
        value={value}
        onChange={handleChangeInput}
        min={min}
        max={max}
        step={step}
        className={styles.range}
      />
      {
        typeInput === TYPE_INPUT.price && <div className={styles.price}>₽</div>
      }
    </article>
  );
};
