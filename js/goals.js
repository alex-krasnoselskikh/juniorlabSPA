//"accumulations-goals"
fetch('/jsons/goals.json')
.then(res => res.json())
.then(data => {
  let out = "";
  data.forEach(element => {
    let progress = element.collected * 100 / element.price
    let backgroundColor = "#4CAF50";
    let color = "white";
    if(progress == 0) {
      color = "black";
      backgroundColor = "#ddd";
    }
    out += `<div>${element.name}: ${element.collected} / ${element.price} ${element.currency}
    <div id="${element.name}" style="width: 100%; background-color: #ddd;">
      <div id="${element.name}-progress" 
      style="
        width: ${progress}%;
        box-sizing: content-box;
        height:1.5em;
        background-color: ${backgroundColor};
        text-align: center;
        line-height: 1.5em;
        font-size: 1em;
        color: ${color}; 
        white-space: nowrap;
        marign: 0;">
          ${progress}%
        </div>
      </div>
      ${element.commentary}
    </div>`;
 
  });
  document.querySelector('.accumulations-goals').innerHTML = out;
  // document.querySelector("#Телефон-progress").style.color = "black";
  // document.querySelector("#Телефон-progress").style.backgroundColor = "";
})
.catch(err => console.log(err));