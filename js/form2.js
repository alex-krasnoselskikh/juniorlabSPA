
function drawTabs() {
  let containerId = 'test';
  let tab = `
    <div class="tab">
      <button class="tablinks active" onclick="loadMoneyOperationForm('Внести трату', '/jsons/expenses.json')">Расходы</button>
      <button class="tablinks" onclick="loadMoneyOperationForm('Внести доход', '/jsons/incomes.json')">Доходы</button>
      <button class="tablinks" onclick="loadTransferForm('${containerId}')">Перемещения</button>
      <button class="tablinks" onclick="loadExchangeForm('${containerId}')">Обмен валют</button>
    </div>
  `;
  return tab;
}
//Load tabs
document.querySelector("#main").innerHTML = drawTabs();
//Load default tab
window.addEventListener("load", function(event) {
  //Double
  loadMoneyOperationForm('Внести трату', '/jsons/expenses.json');
});
//Load either of first two forms
function loadMoneyOperationForm(operation, jsonUrl) {
  loadMoneyOperationComponent('test', operation, null, jsonUrl);
  //Fetch expenses
  fetch(jsonUrl)
  .then((res) => res.json())
  .then((data) =>{
    let expenseGridView = new GridView(data, 'grid');
    //Put object to form
    expenseGridView.itemClick = function(item) {
      let operationText = operation.substring(operation.indexOf(" ")+1, operation.length);
      loadMoneyOperationComponent('test',`Редактировать ${operationText}`, item, jsonUrl);
      
    }
  })
  .catch((err) => console.log("Error: " + err));
}

// Change active class. Purely for styling purposes
const tabs = document.querySelectorAll(".tablinks");
tabs.forEach(element => {
  element.addEventListener("click", function(event){
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].className = tabs[i].className.replace(" active", "");
    }
    event.currentTarget.className += " active";
  });
});
//console.log(tabs);

//Component for load expenses of incomes forms
function loadMoneyOperationComponent(containerId, operation, item, jsonUrl) {
  let ammount = "";
  let dayLabel = "за сегодня";
  let today = new Date();
  //yyyy-mm-dd - format for compatibility
  let dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  //console.log(dateString);
  let commentary = "";
  //Works only for phrase of two words
  let buttonText = operation.substring(operation.indexOf(" ")+1, operation.length);
  if (item !== null && item !== undefined) {
    ammount = item.ammount;
    //Compare two dates without hours and so on   
    let todayDateOnly = new Date(today.getFullYear(),today.getMonth(),today.getDate());
    let parsedDate = new Date(item.date);
    let itemDateOnly = new Date(parsedDate.getFullYear(),parsedDate.getMonth(),parsedDate.getDate());
    if ((todayDateOnly -1) == itemDateOnly) {
      dayLabel = "за вчера";
    }
    // ToDo: вынести отдельное условие для вывода "в будущем"
    if ((todayDateOnly -1 ) < itemDateOnly || (todayDateOnly -1 ) > itemDateOnly) {
      dayLabel = "";
    }
    if ((todayDateOnly +1 ) == itemDateOnly) {
      dayLabel = "на завтра";
    }
    // Commentary
    commentary = item.commentary;
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
        <span class="select" id="currencies-selector" onclick="loadCurrencies(this.id)">Руб</span>
      </div>
      <div class="line">
        <span class="select" id="accounts-selector" onclick="loadAccounts(this.id)">Сбербанк</span>
      </div>
      <div class="line">
          <span class="select" id="categories-selector" onclick="loadCategories(this.id, '${jsonUrl}')">Выберите категорию</span>
      </div>
      <div class="line">
          <input type="text" id="commentary" name="commentary" placeholder="Комментарий и теги" value="${commentary}">
          <span class="select" id="extras-selector" onclick="loadExtras(this.id)">Ещё</span>
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

//console.log(loadCurrencies() + "!");