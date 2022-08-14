import React, {useEffect, useState} from 'react';
import './App.css';
import './Components/CurrencyRow'
import CurrencyRow from './Components/CurrencyRow';

const MAIN_URL = 'https://api.exchangerate.host/latest'

function App() {
  const [currOptions, setCurrOptions] = useState([]);
  const [fromCurr, setFromCurr] = useState();
  const [toCurr, setToCurr] = useState();
  const [exchangeRate, setExchangerate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurr, setAmountInFromCurr] = useState(true);
  let toAmount, fromAmount
  if(amountInFromCurr) 
  {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  }
  else {
    toAmount = amount
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(MAIN_URL)
      .then(response => response.json())
      .then(data => { 
          const firstCurrency = Object.keys(data.rates)[0]
          setCurrOptions([data.base, ...Object.keys(data.rates)])
          setFromCurr(data.base)
          setToCurr(firstCurrency)
          setExchangerate(data.rates[firstCurrency])
    
    })
 }, [])
 
 useEffect(() => {
  fetch(`${MAIN_URL}?base=${fromCurr}&symbols=${toCurr}`)
  .then(response => response.json())
  .then(data => setExchangerate(data.rates[toCurr]))
 }, [fromCurr, toCurr])

 function handleFromAmountChange (e) {
  setAmount(e.target.value)
  setAmountInFromCurr(true)
 }

 function handleToAmountChange (e) {
  setAmount(e.target.value)
  setAmountInFromCurr(false)
 }

  return (
    <header>
        <h1>Convert</h1>
        <CurrencyRow 
          currOptions = {currOptions}
          selectCurr = {fromCurr}
          onChangeCurr = {e => setFromCurr(e.target.value)} 
          onChangeAmount = {handleFromAmountChange}
          amount = {fromAmount}
        />
        
        <div className="equal">=</div>
        
        <CurrencyRow 
        currOptions = {currOptions}
        selectCurr = {toCurr}
        onChangeCurr = {e => setToCurr(e.target.value)}
        onChangeAmount = {handleToAmountChange}
        amount = {toAmount} 
        />
    </header>
  );
}

export default App;
