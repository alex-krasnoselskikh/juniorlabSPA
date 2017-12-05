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
let i = 0 ;
//Get actual data for our currencies
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
