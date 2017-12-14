
let div = document.querySelector('#remains');

fetch('/jsons/accounts.json')
.then(res => res.json())
.then(data => {
  let h5 = document.createElement("h5");
  let hTn= document.createTextNode("Остатки на сегодня:");
  h5.appendChild(hTn);
  div.appendChild(h5);
  data.forEach(element => {
    //Should be written function to create and append ("elementType", "textNode") {}
    let para = document.createElement("p");
    let node = document.createTextNode(element.name + ":");
    para.appendChild(node);
    div.appendChild(para);
    // console.log(para);
    // console.log(node);
    element.funds.forEach(curr => {
      let key = Object.keys(curr);
      let val = Object.values(curr);
      let para = document.createElement("p");
      let node = document.createTextNode(val + " " + key);
      para.appendChild(node);
      div.appendChild(para);
    });

  });
})
.catch(err => console.log(err));
