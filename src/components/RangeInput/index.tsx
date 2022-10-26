import React, { FC } from 'react';
import { Field } from 'formik';
import clsx from 'clsx';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { RangeInputProps } from './RangeInput.types';

import styles from './RangeInput.module.scss';

export const RangeInput: FC<RangeInputProps> = ({ name, label, min, max, step, disabled, children, setFieldValue }) => {
  const defaultMaskOptions = {
    prefix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ' ',
  };
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reg = /[A-Za-zА-Яа-яЁё]/g;
    const eventValueOnlyNumber = parseInt(event.target.value.replace(reg, '').replace(/(\d)(?= \d) /g, '$1'));

    if (Number.isInteger(eventValueOnlyNumber)) {
      setFieldValue(name, eventValueOnlyNumber);
    }

    if (event.target.value === '') {
      setFieldValue(name, 0);
    }
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValueOnlyNumber = parseInt(event.target.value.replace(/(\d)(?= \d) /g, '$1'));
    if (eventValueOnlyNumber > max) {
      setFieldValue(name, max);
    }
    if (eventValueOnlyNumber < min) {
      setFieldValue(name, min);
    }
  };

  return (
    <article className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div className={disabled ? clsx(styles.inputWrapper, styles.disabled) : styles.inputWrapper}>
        {name === 'rate' && <div>{children}</div>}
        <MaskedInput
          mask={currencyMask}
          placeholder="Enter a phone number"
          id="my-input-id"
          render={(inputRef) => (
            <Field
              type="text"
              min={min}
              max={max}
              id={name}
              name={name}
              step={step}
              disabled={disabled}
              className={name === 'rate' ? clsx(styles.input, styles.rate) : styles.input}
              innerRef={inputRef}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
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
          onChange={handleChange}
        />
        {name === 'rate' && <div className={styles.percent}>%</div>}
        {name === 'price' && <div className={styles.price}>₽</div>}
        {name === 'period' && <div className={styles.price}>мес.</div>}
      </div>
    </article>
  );
};
