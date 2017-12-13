function loadExtras(containerId, jsonUrl) {
  let extrasDiv = document.createElement("div");
  extrasDiv.setAttribute("id", "extras");
  let tagsDiv = document.createElement("div");
  tagsDiv.setAttribute("id", "tags");
  let templatesDiv = document.createElement("div");
  templatesDiv.setAttribute("id", "templates");
  extrasDiv.appendChild(tagsDiv);
  extrasDiv.appendChild(templatesDiv);
  console.log(extrasDiv);
}
