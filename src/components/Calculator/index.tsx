import { RangeInput } from 'components/RangeInput'
import { RangeInputProps, TYPE_INPUT } from 'components/RangeInput/RangeInput.types'
import React from 'react'

const initialStatePrice: RangeInputProps = {
    name: 'price',
    label: 'Стоимость автомобиля',
    min: 1000000,
    max: 6000000,
    defaultValue: 3300000,
    typeInput: TYPE_INPUT.price
}

export const Calculator = () => {
  return (
    <form className="form">
        <RangeInput initialState={initialStatePrice}/>
    </form>

  )
}
