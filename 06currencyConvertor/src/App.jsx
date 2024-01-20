import React, { useState } from 'react';
import { InputBox } from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setConvertedAmount(amount);
    setAmount(convertedAmount);
    setFrom(prevFrom => {
      setTo(prevFrom);
      return to;
    });
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div className="bg-gradient-to-r from-blue-200 to-blue-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md mx-auto">
        <form onSubmit={(e) => { e.preventDefault(); convert(); }}>
          <InputBox
            label="From"
            amount={amount}
            onAmountChange={setAmount}
            onCurrencyChange={setFrom}
            currencyOptions={options}
            selectCurrency={from}
            className="mb-4"
          />
          <div className="flex justify-center my-2">
            <button
              type="button"
              className="transform hover:scale-110 transition ease-in-out duration-300 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2"
              onClick={swap}
            >
              Swap
            </button>
          </div>
          <InputBox
            label="To"
            amount={convertedAmount}
            onCurrencyChange={setTo}
            currencyOptions={options}
            selectCurrency={to}
            amountDisable
            className="mb-4"
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition ease-in-out duration-300">
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
