
//Component for load expenses of incomes forms
function loadMoneyOperationComponent(containerId, operation, item, jsonUrl) {
  //Initial fields
  let ammount = "";
  let dayLabel = "за сегодня";
  let today = new Date();
  let account = "Сбербанк"
  let currency = "Руб";
  let category = "Выберите категорию";
  //yyyy-mm-dd - format for compatibility
  let dateString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
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
    // Date
    dateString = `${parsedDate.getFullYear()}-${parsedDate.getMonth()}-${parsedDate.getDate()}`;
    //console.log(dateString);
    //Chahge fields to selected item's
    commentary = item.commentary;
    account = item.account;
    currency = item.currency;
    category = item.category;
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
        <span class="select" id="currencies-selector" onclick="loadCurrencies(this.id)">${currency}</span>
      </div>
      <div class="line">
        <span class="select" id="accounts-selector" onclick="loadAccounts(this.id)">${account}</span>
      </div>
      <div class="line">
          <span class="select" id="categories-selector" onclick="loadCategories(this.id, '${jsonUrl}')">${category}</span>
      </div>
      <div class="line">
          <input type="text" id="commentary" name="commentary" placeholder="Комментарий и теги" value="${commentary}">
          <span class="select" id="extras-selector" onclick="loadExtras(this.id, '${jsonUrl}')">Ещё</span>
      </div>
        <input type="button" value="Зафиксировать ${buttonText}">    
    </div>
  `;
  document.querySelector(`#${containerId}`).innerHTML = form;
}