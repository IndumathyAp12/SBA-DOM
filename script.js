console.log("Memory Game")
const tilesContainer = document.querySelector(".tiles");

// Define animals with their corresponding image paths

const animals = [    { name: 'leopard', image: 'leopard.jpg' },
{ name: 'monkey', image: 'monkey.jpg' },
{ name: 'tiger', image: 'tiger.jpg' },
{ name: 'lion', image: 'lion.jpg' },
{ name: 'elephant', image: 'elephant.jpg' },
{ name: 'deer', image: 'deer.jpg' },
{ name: 'zebra', image: 'zebra.jpg' },
{ name: 'rhino', image: 'rhino.jpg' },
{ name: 'hippo', image: 'hippo.jpg' },
{ name: 'bear', image: 'bear.jpg' }];

// Double the animals list for the memory game

const animalsPicklist = [...animals, ...animals];
const tileCount = animalsPicklist.length;

// Game
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

function buildTile(animal) {
    const element = document.createElement("div");

    element.classList.add("tile");
    element.setAttribute("data-animal", animal);
    element.setAttribute("data-revealed", "false");

        // Set background image
        element.style.backgroundImage = `url('${animal.image}')`;

    element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed");

        if (awaitingEndOfMove || revealed === "true" || element == activeTile) {
            return;
        }
        element.style.backgroundColor = animal;
        if (!activeTile) {
            activeTile = element;
            return;
        }

        const animalToMatch = activeTile.getAttribute("data-animal");
        if (animalToMatch === animal) {
            element.setAttribute("data-revealed", "true");
            activeTile.setAttribute("data-revealed", "true");
          
            
            activeTile = null;
            awaitingEndOfMove = false;
            revealedCount += 2;

            if (revealedCount === tileCount) {
                alert("Congratulations!!! You have won the game.");
            }

            return;
        }




        awaitingEndOfMove = true;

        setTimeout(() => {
            element.style.backgroundColor = null;
            activeTile.style.backgroundColor = null;

            awaitingEndOfMove = false;
            activeTile = null;
        }, 1000);

    });
    return element;
}


// Build up tiles

for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * animalsPicklist.length);
    const animal = animalsPicklist[randomIndex];
    const tile = buildTile(animals);

    animalsPicklist.splice(randomIndex, 1);
    tilesContainer.appendChild(tile);

}