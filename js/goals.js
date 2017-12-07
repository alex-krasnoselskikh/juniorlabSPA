//"accumulations-goals"
fetch('/jsons/goals.json')
.then(res => res.json())
.then(data => {
  let out = "";
  data.forEach(element => {
    let progress = element.collected * 100 / element.price
    let id = `${element.name}-progress`;
    out += `<div>${element.name}: ${element.collected} / ${element.price} ${element.currency}
    <div id="${element.name}" style="width: 100%; background-color: #ddd;">
      <div id="${element.name}-progress" 
      style="
        width: ${progress}%;
        box-sizing: content-box;
        height:1.5em;
        background-color: #4CAF50;
        text-align: center;
        line-height: 1.5em;
        font-size: 1em;
        color: white; 
        white-space: nowrap;
        
        marign: 0;
        ">${progress}%</div>
      </div>
      ${element.commentary}
    </div>`;
    console.log(id);
    // if(progress == 0) {
    //   document.querySelector("#Телефон-progress").style.color = "black";
    // }
  });
  document.querySelector('.accumulations-goals').innerHTML = out;
  // document.querySelector("#Телефон-progress").style.color = "black";
  // document.querySelector("#Телефон-progress").style.backgroundColor = "";
})
.catch(err => console.log(err));