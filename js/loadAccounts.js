function loadAccounts(selectedId) {
  fetch('/jsons/accounts.json')
  .then(res => res.json())
  .then(data => {
    let out = document.createElement("div");
    out.setAttribute("class", "accounts-list");  
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
    para.setAttribute("onclick", "addNew()");
    para.appendChild(tn);
    out.appendChild(para);
    //In case of appendChild() there is onclick inheritance
    // document.querySelector(`#${selectedId}`).appendChild(out);
    document.querySelector(`#${selectedId}`).insertAdjacentElement('beforebegin', out);
  })
  .catch(err => console.log(err))
}

function addNew() {
  console.log('added');
}

function setSelected() {
  console.log('selected');
}