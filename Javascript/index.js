//Use fixer api to retrieve the exchange rates
var baseurl = 'https://data.fixer.io/api/';

// get the fiels using class and id
const inputVal = document.querySelector(".amount"); //user input
const selectFrom = document.getElementById('fromCountry'); //get the current currency
const selectTo = document.getElementById('toCountry'); //get the currency user want to see the exchange rate
const resultAmount = document.querySelector(".result"); //show the conversted rate in choosed currency.

inputVal.addEventListener("input", moneyConvert);

function moneyConvert() {
    //AJAX call via axios
    axios.get(baseurl + 'latest?access_key=45dabd22444f06182c0708a187d63855')
        .then(response => {
            let data = response.data;
            const euroAmount = data.rates.EUR; //latest EURO rate
            const usdollar = data.rates.USD; //latest USD rate
            const yen = data.rates.JPY; //latest JPY rate
            const getAmount = inputVal.value; //amount that user entered

            // create an object of all the rates.
            let rates = {
                USD: {
                    USD: 1,
                    Euro: (1 * euroAmount) / euroAmount,
                    JPY: (1 * yen) / usdollar,
                },
                Euro: {
                    Euro: 1,
                    USD: (1 * usdollar) / euroAmount,
                    JPY: (1 * yen) / euroAmount,
                },
                JPY: {
                    JPY: 1,
                    USD: (1 * usdollar) / yen,
                    Euro: (1 * euroAmount) / yen,
                }
            }
            // check + connvert rate
            if (rates[selectFrom.value] && rates[selectFrom.value][selectTo.value]) {
                resultAmount.value = getAmount * rates[selectFrom.value][selectTo.value];
                console.log(resultAmount.value)
            }
        });
}
