/* CURRENCY CONVERTER */

currency_relativity = {
    "dcrown":10,
    "crown":1,
    "tenth":0.1,
    "piece":0.01,
}

function convertCurrencies() {
    multiplier = currency_relativity[document.getElementById("starting-currency").value] / currency_relativity[document.getElementById("final-currency").value]
    document.getElementById("currency-out").innerHTML = document.getElementById("starting-currency-amount").value * multiplier
}