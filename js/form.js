const form = `<div class="form">
<form action="">
  <div class="line">
    <div class="label">
      <h3>Внести трату за $сегодня</h3>
    </div>
    <div class="datepicker">
        <input type="date" name="date" id="date">
    </div>
  </div>
  <div class="date-display">
    3 декабря, воскресенье
  </div>
  <div class="line">
    <input type="text" id="ammount" name="ammount" placeholder="Сумма">
    <div id="currency-block">
      <select name="currency" id="currency"></select>
    </div>
  </div>
  <div class="line">
    <select name="account-selector" id="account-selector"></select>
  </div>
  <div class="select">
    <select name="category-selector" id="category-selector"></select>
  </div>
  <div class="line">
    <input type="text" id="commentary" name="commentary" placeholder="Комментарий и теги">
    <div id="more-block"><a href="#">Ещё</a></div>
  </div>
  <input type="button" value="Зафиксировать трату">
</form>
</div>`;

document.querySelector(".action-form").innerHTML = form;


//let currencyOptions = document.createElement("option");

fetch('../jsons/currencies.json')
.then(res => res.json())
.then(data => {
  data.forEach(element => {
    let currency = document.getElementById("currency");
    let currencyOptions = document.createElement("option");
    currencyOptions.value = element.code;
    //console.log(currencyOptions);
    currencyOptions.text = element.name;
    //console.log(currencyOptions.text);
    currency.add(currencyOptions);
  });
})
.catch(err => console.log(err));



fetch('../jsons/expenses-categories.json')
.then(res => res.json())
.then(data => {
  data.forEach(element => {
    let categories = document.querySelector("#category-selector");
    let categoriesOptions = document.createElement("option");
    categoriesOptions.value = element.name;
    //console.log(currencyOptions);
    categoriesOptions.text = element.name;
    //console.log(currencyOptions.text);
    categories.add(categoriesOptions);
  });
})
.catch(err => console.log(err));



fetch('../jsons/accounts.json')
.then(res => res.json())
.then(data => {
  data.forEach(element => {
    let accounts = document.querySelector("#account-selector");
    let accountsOptions = document.createElement("option");
    accountsOptions.value = element.name;
    //console.log(currencyOptions);
    accountsOptions.text = element.name;
    //console.log(currencyOptions.text);
    accounts.add(accountsOptions);
  });
})
.catch(err => console.log(err));