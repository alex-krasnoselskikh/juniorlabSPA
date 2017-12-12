//Need to make it toggleable
function loadCurrencies(containerId) {
  fetch('/jsons/currencies.json')
  .then(res => res.json())
  .then(data => {
    let out = document.createElement("div");
    out.setAttribute("class", "currencies-list");  
    data.forEach(element => {
      console.log(element);
      let para = document.createElement("p");
      para.setAttribute("onclick", "setSelected()");
      let tn = document.createTextNode(element.name);
      para.appendChild(tn);
      out.appendChild(para);
      //console.log(selectedId);
    });
    //console.log(out);
    let para = document.createElement("p");
    let tn = document.createTextNode("+Добавить");
    para.setAttribute("id", "add-currency-selector")
    para.setAttribute("onclick", "addNewCurrency(this.id)");
    para.appendChild(tn);
    out.appendChild(para);
    //In case of appendChild() there is onclick inheritance
    // document.querySelector(`#${selectedId}`).appendChild(out);
    document.querySelector(`#${containerId}`).insertAdjacentElement('afterend', out);
    //document.body.removeEventListener()
    //document.querySelector(`#${containerId}`).innerHTML = out;
    
  })
  .catch(err => console.log(err));
   
}

function addNewCurrency(containerId) {
  //console.log("added");
  let out = `
    <div class="currency-add">
      <form>
        <input type="text" id="new-currency-name" placeholder="Введите название валюты" value="">
        <input type="text" id="new-currency-code" placeholder="Введите код валюты" value="">
        <input type="text" id="new-currency-rate" placeholder="Введите курс валюты" value="">
        <input type="checkbox" name="is-default" value="default">Сделать основной валютой<br>
        <input type="checkbox" name="is-auto-convert" checked value="auto-convert">Конвертировать автоматически<br>
        <input type="button" value="Добавить">
        <input type="button" value="Закрыть">
      <form>
    </div>
  `;
  document.querySelector(`#${containerId}`).innerHTML = out;
}

// function addNew() {
//   console.log('added');
// }

function setSelected() {
  console.log('selected');
}