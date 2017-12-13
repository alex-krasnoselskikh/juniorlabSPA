//Load tabs
document.querySelector("#main").innerHTML = drawTabs();
//When document is loaded
window.addEventListener("load", function(event) {
  //Load default tab
  loadMoneyOperationForm('Внести трату', '/jsons/expenses.json');
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
});

function drawTabs() {
  let containerId = 'test';
  let tab = `
    <div class="tab">
      <button class="tablinks active" onclick="loadMoneyOperationForm('Внести трату', '/jsons/expenses.json')">Расходы</button>
      <button class="tablinks" onclick="loadMoneyOperationForm('Внести доход', '/jsons/incomes.json')">Доходы</button>
      <button class="tablinks" onclick="loadTransferForm('Внести перемещение', '/jsons/transfers.json')">Перемещения</button>
      <button class="tablinks" onclick="loadExchangeForm('Внести обмен', '/jsons/exchanges.json')">Обмен валют</button>
    </div>
  `;
  return tab;
}

//Load either of first two forms
function loadMoneyOperationForm(operation, jsonUrl) {
  loadMoneyOperationComponent('test', operation, null, jsonUrl);
  //Fetch expenses
  fetch(jsonUrl)
  .then((res) => res.json())
  .then((data) =>{
    let moneyOperationGridView = new GridView(data, 'grid');
    //Put object to form
    moneyOperationGridView.itemClick = function(item) {
      let operationText = operation.substring(operation.indexOf(" ")+1, operation.length);
      loadMoneyOperationComponent('test',`Редактировать ${operationText}`, item, jsonUrl);     
    }
  })
  .catch((err) => console.log("Error: " + err));
}
//Transfer
function loadTransferForm(operation, jsonUrl) {
  loadTransferComponent('test', operation, null, jsonUrl);
  //Fetch expenses
  fetch(jsonUrl)
  .then((res) => res.json())
  .then((data) =>{
    let transferGridView = new GridViewTransfer(data, 'grid');
    //Put object to form
    transferGridView.itemClick = function(item) {
      let operationText = operation.substring(operation.indexOf(" ")+1, operation.length);
      loadTransferComponent('test',`Редактировать ${operationText}`, item, jsonUrl);     
    }
  })
  .catch((err) => console.log("Error: " + err));
}
//Exchange
function loadExchangeForm(operation, jsonUrl) {
  loadExchangeComponent('test', operation, null, jsonUrl);
  //Fetch expenses
  fetch(jsonUrl)
  .then((res) => res.json())
  .then((data) =>{
    let exchangeGridView = new GridViewExchange(data, 'grid');
    //Put object to form
    exchangeGridView.itemClick = function(item) {
      let operationText = operation.substring(operation.indexOf(" ")+1, operation.length);
      loadExchangeComponent('test',`Редактировать ${operationText}`, item, jsonUrl);     
    }
  })
  .catch((err) => console.log("Error: " + err));
}

