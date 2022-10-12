import React from 'react';

import { Calculator } from 'components/Calculator';

import styles from './Home.module.scss';

export const Home = () => {
  return (
    <>
      <h1 className={styles.title}>Рассчитайте стоимость автомобиля в лизинг</h1>
      <Calculator />
    </>
  );
};
