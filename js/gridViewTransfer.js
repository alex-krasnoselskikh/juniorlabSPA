class GridViewTransfer {
  constructor(dataSource, containerId) {
    if (dataSource === undefined || dataSource === null)
      throw "Invalid or empty data source";
    this.dataSource = dataSource;
    //this.selectedItem = null;
    this.containerId = containerId;
    this.draw();
  }
  draw () {
    let out = "<table>";
    this.dataSource.forEach(element => {
      let date = new Date(element.date);
      date = date.toLocaleString();
      //console.log(date);
      //console.log(element);
      out += `
    <tr id='${element.id}'>
      <td>Из:${element.from} <br> В:${element.to}</td>
      <td>${element.commentary}</td>
      <td>${element.ammount}</td>
      <td>${element.currency}</td>
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