class GridViewExchange {
  constructor(dataSource, containerId) {
    if (dataSource === undefined || dataSource === null)
      throw "Invalid or empty data source";
    this.dataSource = dataSource;
    //this.selectedItem = null;
    this.containerId = containerId;
    this.draw();
  }
  draw () {
    let out = "Кликните для редактирования <table>";
    this.dataSource.forEach(element => {
      let date = new Date(element.date);
      date = date.toLocaleString();
      out += `
    <tr id='${element.id}'>
      <td>${element.account} <br> Курс:${element.rate}</td>
      <td>Купили:${element.boughtAmmount} <br> Продали:${element.soldAmmount}</td>
      <td>${element.boughtCurrency} <br> ${element.soldCurrency}</td>
      <td>${element.commentary}</td>
      <td>${date}</td>
    </tr>`;
    });
    out += "</table>";
    document.querySelector(`#${this.containerId}`).innerHTML = out;
    let me = this;
    this.dataSource.forEach(element => {
      //add onclick and pass element
      document.getElementById(element.id).onclick = function() {
        me.itemClick(element);
      }
    });
  }
  itemClick(element) {
    throw Error("Need override this method!");
  }
};