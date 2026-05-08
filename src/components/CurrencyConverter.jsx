import { useState, useEffect } from 'react';

function CurrencyConverter() {
  // state variables to store data
  var [amount, setAmount] = useState(1);
  var [fromCurrency, setFromCurrency] = useState("INR");
  var [toCurrency, setToCurrency] = useState("USD");
  var [convertedAmount, setConvertedAmount] = useState(null);
  var [exchangeRate, setExchangeRate] = useState(null);
  var [currencyList, setCurrencyList] = useState([]);
  var [loading, setLoading] = useState(false);
  var [error, setError] = useState("");

  // this runs when the page loads first time - to get all currency names
  useEffect(function () {
    fetch("https://api.exchangerate-api.com/v4/latest/INR")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // get all the currency codes from the api
        var currencies = Object.keys(data.rates);
        setCurrencyList(currencies);
      })
      .catch(function (err) {
        console.log("Error fetching currency list:", err);
        setError("Failed to load currencies");
      });
  }, []);

  // this function will convert the currency when button is clicked
  function handleConvert() {
    if (amount <= 0 || amount === "") {
      setError("Please enter a valid amount!");
      return;
    }

    setLoading(true);
    setError("");
    setConvertedAmount(null);

    // fetching the exchange rate from api
    var url = "https://api.exchangerate-api.com/v4/latest/" + fromCurrency;

    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .then(function (data) {
        // getting the rate for the target currency
        var rate = data.rates[toCurrency];
        setExchangeRate(rate);

        // calculating the converted amount
        var result = amount * rate;
        setConvertedAmount(result);
        setLoading(false);
      })
      .catch(function (err) {
        console.log("Error:", err);
        setError("Failed to convert. Try again!");
        setLoading(false);
      });
  }

  // swap the from and to currencies
  function handleSwap() {
    var temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setConvertedAmount(null);
    setExchangeRate(null);
  }

  return (
    <div className="converter-section" id="currencyConverter">
      <h2 className="section-title">💱 Currency Converter</h2>

      <div className="converter-card">
        {/* Amount Input */}
        <div className="converter-row">
          <label className="converter-label">Amount</label>
          <input
            type="number"
            className="converter-input"
            value={amount}
            onChange={function (e) {
              setAmount(e.target.value);
              setConvertedAmount(null);
            }}
            placeholder="Enter amount"
            min="0"
            id="converterAmount"
          />
        </div>

        {/* From and To Currency */}
        <div className="converter-currencies">
          <div className="converter-row">
            <label className="converter-label">From</label>
            <select
              className="converter-select"
              value={fromCurrency}
              onChange={function (e) {
                setFromCurrency(e.target.value);
                setConvertedAmount(null);
              }}
              id="fromCurrency"
            >
              {currencyList.map(function (currency) {
                return (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                );
              })}
            </select>
          </div>

          <button className="swap-btn" onClick={handleSwap} title="Swap currencies" id="swapBtn">
            ⇄
          </button>

          <div className="converter-row">
            <label className="converter-label">To</label>
            <select
              className="converter-select"
              value={toCurrency}
              onChange={function (e) {
                setToCurrency(e.target.value);
                setConvertedAmount(null);
              }}
              id="toCurrency"
            >
              {currencyList.map(function (currency) {
                return (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Convert Button */}
        <button
          className="btn-primary convert-btn"
          onClick={handleConvert}
          disabled={loading}
          id="convertBtn"
        >
          {loading ? "Converting..." : "Convert 💱"}
        </button>

        {/* Error Message */}
        {error !== "" && (
          <div className="converter-error" id="converterError">
            ⚠️ {error}
          </div>
        )}

        {/* Result */}
        {convertedAmount !== null && (
          <div className="converter-result" id="converterResult">
            <div className="result-from">
              {parseFloat(amount).toLocaleString("en-IN")} {fromCurrency}
            </div>
            <div className="result-equals">=</div>
            <div className="result-to">
              {convertedAmount.toFixed(2).toLocaleString()} {toCurrency}
            </div>
            <div className="result-rate">
              1 {fromCurrency} = {exchangeRate} {toCurrency}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrencyConverter;
