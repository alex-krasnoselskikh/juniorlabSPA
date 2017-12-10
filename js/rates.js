//http://fixer.io/ - better api? But uses RUB code insdead of RUR
//https://api.fixer.io/latest?base=RUB
//https://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json
//data.Valute.USD.Name
const url = 'https://www.cbr-xml-daily.ru/daily_json.js';

// Get all currencies in our system
let myCurrencies = [];
fetch('jsons/currencies.json')
.then(res => res.json())
.then(data => {
  data.forEach(element => {
    myCurrencies.push(element.code);
  });
})
.catch(err => console.log(err));

console.log(myCurrencies);

let todayRates = [];
let out = "";
//Get actual data for our currencies
//Think about synchronous request
fetch(url)
.then(res => res.json())
.then(data => {
  myCurrencies.forEach(element => {
    if (data.Valute[element] !== undefined) {
       let tmp;
       out += `<p>${data.Valute[element]['Name']}: ${data.Valute[element]['Value'].toFixed(2)}</p> \n`;
       document.querySelector(".daily-rates").innerHTML = out;
    }
  });
})
.catch(err => console.log(err));

// function countInto(currency) {
//   fetch('jsons/accounts.json')
//   .then(res => res.json())
//   .then(data => {
//     data.forEach(element => {
//       element.funds.forEach(fund => {
//         if (Object.keys(fund) != currency) {
//           console.log(fund);
//         }
//       });
//     });
//   })
//   .catch(err => console.log(err));
// } 

// countInto('usd');