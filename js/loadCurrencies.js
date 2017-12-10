

export default function loadCurrencies() {
  fetch('../jsons/currencies.json')
  .then(res => res.json())
  .then(data => {
    let out = "";
    data.forEach(element => {
      out += element;
    });
    return out;
  })
  .catch(err => console.log(err));
}