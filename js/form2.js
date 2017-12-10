
function drawTabs() {
  let containerId = 'test';
  let tab = `
    <div class="tab">
      <button class="tablinks active" onclick="loadMoneyOperationComponent('${containerId}', 'Внести трату')">Расходы</button>
      <button class="tablinks" onclick="loadMoneyOperationComponent('${containerId}', 'Внести доход')">Доходы</button>
      <button class="tablinks" onclick="loadTransferForm('${containerId}')">Перемещения</button>
      <button class="tablinks" onclick="loadExchangeForm('${containerId}')">Обмен валют</button>
    </div>
  `;
  return tab;
}

document.querySelector("#main").innerHTML = drawTabs();
// Load default tab
window.addEventListener("load", function(event) {
  loadMoneyOperationComponent('test', 'Внести трату');
  //Fetch expenses
  fetch('../jsons/expenses.json')
  .then((res) => res.json())
  .then((data) =>{
    //console.log(data);
    let expenseGridView = new GridView(data, 'grid');
  })
  .catch((err) => console.log("Error: " + err));
});
// Change active class
let tabs = document.querySelectorAll(".tablinks");
tabs.forEach(element => {
  element.addEventListener("click", function(event){
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].className = tabs[i].className.replace(" active", "");
    }
    event.currentTarget.className += " active";
  });
});
//console.log(tabs);


function loadMoneyOperationComponent(containerId, operation, expense) {
  let ammount = "";
  let dayLabel = "за сегодня";
  let today = new Date();
  //yyyy-mm-dd - format for compatibility
  let dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  //console.log(dateString);
  let commentary = "";
  let buttonText = operation.substring(operation.indexOf(" ")+1, operation.length);
  if (expense !== null && expense !== undefined) {
    ammount = expense.ammount;
    //Compare two dates without hours and so on   
    let todayDateOnly = new Date(today.getFullYear(),today.getMonth(),today.getDate());
    let expenseDateOnly = new Date(expense.date.getFullYear(),expense.date.getMonth(),expense.date.getDate());
    if ((todayDateOnly.toDate() -1) == expenseDateOnly) {
      dayLabel = "за вчера";
    }
    // ToDo: вынести отдельное условие для вывода "в будущем"
    if ((todayDateOnly.toDate() -1 ) < expenseDateOnly || (todayDateOnly.toDate() -1 ) > expenseDateOnly) {
      dayLabel = "";
    }
    if ((todayDateOnly.toDate() +1 ) == expenseDateOnly) {
      dayLabel = "на завтра";
    }
    // Commentary
    commentary = expense.commentary;
  }

  const form = `
    <div class ="form">
      <div class="line">
        <div>
          <h3>${operation} <span class="select">${dayLabel}<span></h3>
        </div>
        <div class="daylabel">
          <input type="date" name="date" id="date" value="${dateString}">
        </div>
      <div class="line">
        <input type="text" id="ammount" name="ammount" placeholder="Сумма" value="${ammount}">
        <span class="select" onclick="loadCurrencies()">Руб</span>
      </div>
      <div class="line">
        <span class="select" onclick="loadAccounts">Сбербанк</span>
      </div>
      <div class="line">
          <span class="select" onclick="loadCategories()"Выберите категорию расходов</span>
      </div>
      <div class="line">
          <input type="text" id="commentary" name="commentary" placeholder="Комментарий и теги" value="${commentary}">
          <span class="select">Ещё</span>
      </div>
        <input type="button" value="Зафиксировать ${buttonText}">    
    </div>
  `;
  document.querySelector(`#${containerId}`).innerHTML = form;
}

function loadTransferForm(containerId) {
  const form = `
    <div class ="form">
      <div class="line">
        <div>
          <h3>Перемещение за <span class="select">сегодня<span></h3>
        </div>
        <div>
          <input type="date" name="date" id="date">
        </div>
        <div>
          10 декабря, воскресенье
        </div>
      <div class="line">
        <input type="text" id="ammount" name="ammount" placeholder="Сумма">
        <span class="select" onclick="loadCurrencies()">Руб</span>
      </div>
      <div class="line">
        Из: <span class="select" onclick="loadAccounts">Сбербанк</span>
        В: <span class="select" onclick="loadAccounts">Сбербанк</span>
      </div>
      <div class="line">
          <input type="text" id="commentary" name="commentary" placeholder="Комментарий и теги">
          <span class="select">Ещё</span>
      </div>
        <input type="button" value="Зафиксировать перемещение">    
    </div>
  `;
  document.querySelector(`#${containerId}`).innerHTML = form;
}

function loadExchangeForm(containerId) {
  const form = `
    <div class ="form">
      <div class="line">
        <div>
          <h3>Внести обмен за <span class="select">сегодня<span></h3>
        </div>
        <div>
          <input type="date" name="date" id="date">
        </div>
        <div>
          10 декабря, воскресенье
        </div>
      <div class="line">
        Купили:
        <input type="text" id="ammount" name="ammount" placeholder="Сумма">
        <span class="select" onclick="loadCurrencies()">Руб</span>
      </div>
      <div class="line">
        Продали:
        <input type="text" id="ammount" name="ammount" placeholder="Сумма">
        <span class="select" onclick="loadCurrencies()">Руб</span>
      </div>
      <div class="line">
        Продали из:
        <span class="select" onclick="loadAccounts">Сбербанк</span>
      </div>
      <div class="line">
          <input type="text" id="commentary" name="commentary" placeholder="Комментарий и теги">
          <span class="select">Ещё</span>
      </div>
        <input type="button" value="Зафиксировать обмен">    
    </div>
  `;
  document.querySelector(`#${containerId}`).innerHTML = form;
}


function loadCurrencies() {
  fetch('/jsons/currencies.json')
  .then(res => res.json())
  .then(data => {  
    data.forEach(element => {
      console.log(element); 
    });
    
  })
  .catch(err => console.log(err));
   
}

//console.log(loadCurrencies() + "!");