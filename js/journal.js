function getExpenses() {
  fetch('../jsons/expenses.json')
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      let out = "";
      data.forEach(element => {
        out += `
    <table>
      <tr>
        <td>${element.category}</td>
        <td>${element.commentary}</td>
        <td>${element.ammount}</td>
        <td>${element.currency}</td>
        <td>${element.date}</td>
      </tr>
    </table>
    `;
      });
      document.querySelector("#expensesTable").innerHTML = out;
    })
    .catch((err) => console.log("Error: " + err));
}

getExpenses();

// class Expenses {
//   constructor(date, account, ammount, currency, commentary) {
//     this.date = date;
//     this.account = account;
//     this.currency = currency;
//     this.commentary = commentary;
//   }
//   subtractFrom () {

//   }
// }