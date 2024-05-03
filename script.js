console.log("Memory Game")
const tilesContainer =  document.querySelector(".tiles");
const  animals = ['leopard', 'monkey', 'tiger','lion','elephant','crocodile','fox','deer','zebra','rhino','hippo','bear'];
const  animalsPicklist = [...animals,...animals];
const tileCount = animalsPicklist.length;

// Game
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

function buildTile(animal) {
    const element =document.createElement("div");

    element.classList.add("tile");
    element.setAttribute("data-animal", animal);
    element.setAttribute("data-revealed", "false");
    element.addEventListener("click", () => {
 if (awaitingEndOfMove) {
    return;
 }
  element.style.backgroundColor = animal;
  if (!activeTile) {
    activeTile = element;
    return;
  }

  awaitingEndOfMove = true;

  setTimeout(() =>{
    element.style.backgroundColor = null;
    activeTile.style.backgroundColor = null;

    awaitingEndOfMove = false;
    activeTile = null;
  },1000);

    });
    return element;
}


// Build up tiles

for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * animalsPicklist.length);
    const animals = animalsPicklist[randomIndex];
const tile = buildTile(animals);

    animalsPicklist.splice(randomIndex, 1);
    tilesContainer.appendChild(tile);
    
}