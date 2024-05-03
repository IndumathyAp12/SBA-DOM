console.log("Memory Game")
const tilesContainer =  document.querySelector(".tiles");
const  animals = ['leopard', 'monkey', 'tiger','lion','elephant','crocodile','fox','deer','zebra'];
const  animalsPicklist = [...animals,...animals];
const tileCount = animalsPicklist.length;

// Game
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

// Build up tiles

for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * animalsPicklist.length);
    const animals = animalsPicklist[randomIndex];
    animalsPicklist.splice(randomIndex, 1);
    console.log(animals);
}