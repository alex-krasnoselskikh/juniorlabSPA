fetch('/jsons/goals.json')
.then(res => res.json())
.then(data => {
  let out = "";
  data.forEach(element => {
    let progress = element.collected * 100 / element.price
    let prWidth = progress
    let backgroundColor = "#4CAF50";
    let color = "white";
    if (progress == 0) {
      color = "black";
      backgroundColor = "#ddd";
    }
    if (progress <= 15) {
      prWidth = 15;
    }
    out += `<div>${element.name}: ${element.collected} / ${element.price} ${element.currency}
    <div id="${element.name}" style="width: 100%; background-color: #ddd;">
      <div id="${element.name}-progress" 
      style="
        width: ${prWidth}%;
        box-sizing: content-box;
        height:1.5em;
        background-color: ${backgroundColor};
        text-align: center;
        line-height: 1.5em;
        font-size: 1em;
        color: ${color}; 
        white-space: nowrap;
        overflow: hidden;
        marign: 0;">
          ${progress}%
        </div>
      </div>
      ${element.commentary}
    </div>`;
 
  });
  document.querySelector('.accumulations-goals').innerHTML = out;
})
.catch(err => console.log(err));