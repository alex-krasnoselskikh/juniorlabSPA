function loadExtras(containerId, jsonUrl) {
  let extrasDiv = document.createElement("div");
  extrasDiv.setAttribute("id", "extras");
  (function loadTemplates(jsonUrl) {
    let templatesDiv = document.createElement("div");
    let tn = document.createTextNode("Шаблоны:");
    templatesDiv.appendChild(tn);
    //jsonUrl is needed for load different templates
    const endString = "-templates.json";
    let modifiedJsonUrl = jsonUrl.slice(0, jsonUrl.indexOf("."));
    let className = modifiedJsonUrl.slice(modifiedJsonUrl.lastIndexOf("/") + 1, modifiedJsonUrl.length);
    modifiedJsonUrl += endString;
    //console.log(modifiedJsonUrl);
    fetch(modifiedJsonUrl)
    .then(res => res.json())
    .then(data => {
      templatesDiv.setAttribute("class", `${className}-templates-list`);  
      data.forEach(element => {
        let para = document.createElement("p");
        para.setAttribute("onclick", "setSelected()");
        let tn = document.createTextNode(element.name);
        para.appendChild(tn);
        templatesDiv.appendChild(para);
        //console.log(containerId);
      });
      //console.log(out);
      let para = document.createElement("p");
      let tn = document.createTextNode("+Добавить");
      para.setAttribute("onclick", "addNew()");
      para.appendChild(tn);
      templatesDiv.appendChild(para);
      extrasDiv.appendChild(templatesDiv);
      //In case of appendChild() there is onclick inheritance
      // document.querySelector(`#${containerId}`).appendChild(out);
      //document.querySelector(`#${containerId}`).insertAdjacentElement('afterend', extrasDiv);
    })
    .catch(err => console.log(err))
  }(jsonUrl));

  (function loadTags() {
    let tagsDiv = document.createElement("div");
    let tn = document.createTextNode("Теги:");
    tagsDiv.appendChild(tn);
    fetch('/jsons/tags.json')
    .then(res => res.json())
    .then(data => {
      tagsDiv.setAttribute("class", `tags-list`);  
      data.forEach(element => {
        let para = document.createElement("p");
        para.setAttribute("onclick", "setSelected()");
        let tn = document.createTextNode(element.name);
        para.appendChild(tn);
        tagsDiv.appendChild(para);
        //console.log(containerId);
      });
      //console.log(out);
      let para = document.createElement("p");
      let tn = document.createTextNode("+Добавить");
      para.setAttribute("onclick", "addNew()");
      para.appendChild(tn);
      tagsDiv.appendChild(para);
      extrasDiv.appendChild(tagsDiv);
      //In case of appendChild() there is onclick inheritance
      // document.querySelector(`#${containerId}`).appendChild(out);
      //document.querySelector(`.`).insertAdjacentElement('afterend', extrasDiv);
    })
    .catch(err => console.log(err))
  }());
  
  document.querySelector(`#${containerId}`).insertAdjacentElement('afterend', extrasDiv);

  function addNew() {
    console.log('added');
  }
  
  function setSelected() {
    console.log('selected');
  }
}
