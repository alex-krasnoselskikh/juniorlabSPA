
let div = document.querySelector('.remains');

fetch('/jsons/accounts.json')
.then(res => res.json())
.then(data => {
  data.forEach(element => {
    let para = document.createElement("p");
    let node = document.createTextNode(element.name + ":");
    para.appendChild(node);
    div.appendChild(para);
    // console.log(para);
    // console.log(node);
    element.funds.forEach(curr => {
      let key = Object.keys(curr);
      //console.log(key);
      let val = Object.values(curr);
      //console.log(val);
      let para = document.createElement("p");
      let node = document.createTextNode(val + " " + key);
      para.appendChild(node);
      div.appendChild(para);
    });
  });
})
.catch(err => console.log(err));

