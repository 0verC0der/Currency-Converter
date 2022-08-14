import React from 'react'

export default function CurrencyRow(props) {
  const {
    currOptions, 
    onChangeCurr,
    onChangeAmount,
    selectCurr,
    amount,
  } = props
  return (
    <div>
        <input type="number" className="input" value={amount} onChange = {onChangeAmount}/>
        <select value = {selectCurr} onChange={onChangeCurr}>
        {currOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        )) }
        </select>
    </div>
  )
}
