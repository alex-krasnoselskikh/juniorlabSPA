function loadExchangeComponent(containerId, operation, item, jsonUrl) {
  let boughtAmmount = "";
  let soldAmmount = "";
  let soldCurrency = "Руб";
  let boughtCurrency = "Руб";
  let dayLabel = "за сегодня";
  let account = "Cбербанк";
  let today = new Date();
  let commentary = "";
  //yyyy-mm-dd - format for compatibility
  let dateString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
  //console.log(dateString);
  //Works only for phrase of two words
  //let buttonText = operation.substring(operation.indexOf(" ")+1, operation.length);
  if (item !== null && item !== undefined) {
    //Compare two dates without hours and so on   
    let todayDateOnly = new Date(today.getFullYear(),today.getMonth(),today.getDate());
    let parsedDate = new Date(item.date);
    let itemDateOnly = new Date(parsedDate.getFullYear(),parsedDate.getMonth()+1,parsedDate.getDate());
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
    // Date
    dateString = `${parsedDate.getFullYear()}-${parsedDate.getMonth()+1}-${parsedDate.getDate()}`;
    //console.log(dateString);
    // Commentary
    commentary = item.commentary;
    boughtAmmount = item.boughtAmmount;
    soldAmmount = item.soldAmmount;
    soldCurrency = item.soldCurrency;
    boughtCurrency = item.boughtCurrency;
    account = item.account;
  }
  const form = `
    <div class ="form">
      <div class="line">
        <div>
          <h3>${operation} обмен за <span class="select">${dayLabel}<span></h3>
        </div>
        <div>
          <input type="date" name="date" id="date" value="${dateString}">
        </div>
        <div class="line">
          Купили:<br>
          <input type="text" id="ammount-bought" name="ammount-bought" placeholder="Сумма" value="${boughtAmmount}">
          <span class="select" id="currencies-bought" onclick="loadCurrencies(this.id)">${boughtCurrency}</span>
        </div>
      <div class="line">
        Продали:<br>
        <input type="text" id="ammount-sold" name="ammount-sold" placeholder="Сумма" value="${soldAmmount}">
        <span class="select" id="currencies-sold" onclick="loadCurrencies(this.id)">${soldCurrency}</span>
      </div>
      <div class="line">
        Продали из:
        <span class="select" id="accounts-selector" onclick="loadAccounts(this.id)">${account}</span>
      </div>
      <div class="line">
          <input type="text" id="commentary" name="commentary" placeholder="Комментарий и теги"value="${commentary}">
          <span class="select" id="exchanges-extras" onclick="loadExtras(this.id, '${jsonUrl}')">Ещё</span>
      </div>
        <input type="button" value="Зафиксировать обмен">    
    </div>
  `;
  document.querySelector(`#${containerId}`).innerHTML = form;
}