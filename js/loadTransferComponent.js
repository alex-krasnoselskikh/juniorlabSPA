function loadTransferComponent(containerId, operation, item, jsonUrl) {
  let ammount = "";
  let accountFrom = "Сбербанк";
  let accountTo = "Сбербанк";
  let dayLabel = "за сегодня";
  let today = new Date();
  let commentary = "";
  let currency = "Руб";
  //yyyy-mm-dd - format for compatibility
  let dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  //console.log(dateString);
  //Works only for phrase of two words
  //let buttonText = operation.substring(operation.indexOf(" ")+1, operation.length);
  if (item !== null && item !== undefined) {
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
    // Commentary
    commentary = item.commentary;
    accountFrom = item.from;
    accountTo = item.to;
    ammount = item.ammount;
    currency = item.currency;
  }
  const form = `
    <div class ="form">
      <div class="line">
        <div>
          <h3>${operation} за <span class="select">${dayLabel}<span></h3>
        </div>
        <div>
          <input type="date" name="date" id="date" value="${dateString}">
        </div>
      <div class="line">
        <input type="text" id="ammount" name="ammount" placeholder="Сумма" value="${ammount}">
        <span class="select" id="currencies-selector" onclick="loadCurrencies(this.id)">${currency}</span>
      </div>
      <div class="line">
        Из: <span class="select" id="account-from" onclick="loadAccounts(this.id)">${accountFrom}</span><br>
        В: <span class="select" id="account-to" onclick="loadAccounts(this.id)">${accountTo}</span>
      </div>
      <div class="line">
          <input type="text" id="commentary" name="commentary" placeholder="Комментарий и теги" value="${commentary}">
          <span class="select" id="extras-selector" onclick="loadExtras(this.id, '${jsonUrl}')">Ещё</span>
      </div>
        <input type="button" value="Зафиксировать перемещение">    
    </div>
  `;
  document.querySelector(`#${containerId}`).innerHTML = form;
}