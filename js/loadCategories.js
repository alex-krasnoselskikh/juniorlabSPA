function loadCategories(containerId, jsonUrl) {
  //jsonUrl is needed for load different categories
  const endString = "-categories.json";
  let modifiedJsonUrl = jsonUrl.slice(0, jsonUrl.indexOf("."));
  let className = modifiedJsonUrl.slice(modifiedJsonUrl.lastIndexOf("/") + 1, modifiedJsonUrl.length);
  modifiedJsonUrl += endString;
  fetch(modifiedJsonUrl)
  .then(res => res.json())
  .then(data => {
    let out = document.createElement("div");
    out.setAttribute("class", `${className}-list`);  
    data.forEach(element => {
      let para = document.createElement("p");
      para.setAttribute("onclick", "setSelected()");
      let tn = document.createTextNode(element.name);
      para.appendChild(tn);
      out.appendChild(para);
      //console.log(containerId);
    });
    //console.log(out);
    let para = document.createElement("p");
    let tn = document.createTextNode("+Добавить");
    para.setAttribute("onclick", "addNew()");
    para.appendChild(tn);
    out.appendChild(para);
    //In case of appendChild() there is onclick inheritance
    // document.querySelector(`#${containerId}`).appendChild(out);
    document.querySelector(`#${containerId}`).insertAdjacentElement('afterend', out);

  })
  .catch(err => console.log(err))
}

function addNew() {
  console.log('added');
}

function setSelected() {
  console.log('selected');
}