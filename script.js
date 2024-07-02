console.log("Memory Game");

const tileTemplate = document.getElementById("tile-template");
const tilesContainer = document.getElementById("tilesContainer");
// Get the form and input element
const playerForm = document.getElementById("playerForm");
const playerNameInput = document.getElementById("playerName");
const playerNameError = document.getElementById("playerNameError");
let gameStart = false;

const animals = [
    { name: 'leopard', image: 'images/leopard.jpg' },
    { name: 'monkey', image: 'images/monkey.jpg' },
    { name: 'tiger', image: 'images/tiger.jpg' },
    { name: 'lion', image: 'images/lion.jpg' },
    { name: 'elephant', image: 'images/elephant.jpg' },
    { name: 'deer', image: 'images/deer.jpg' },
    { name: 'zebra', image: 'images/zebra.jpg' },
    { name: 'rhino', image: 'images/rhino.jpg' },
    { name: 'hippo', image: 'images/hippo.jpg' },
    { name: 'bear', image: 'images/bear.jpg' }
];

const animalsPicklist = [...animals, ...animals];
const tileCount = animalsPicklist.length;

let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

// Function to build a tile using the template
function buildTile(animal) {
    // Clone the template content
    const tile = tileTemplate.content.cloneNode(true);

    // Configure the tile
    const tileElement = tile.querySelector(".tile");
    tileElement.setAttribute("data-animal", animal.name);

    // Add event listener to the tile
    tileElement.addEventListener("click", () => {
        handleTileClick(tileElement, animal.image);
    });

    // Append the tile to the container
    tilesContainer.appendChild(tile);

    return tileElement;
}

// Game logic function to handle tile clicks
function handleTileClick(tileElement, animalImage) {
    // Retrieve data attribute
    const revealed = tileElement.getAttribute("data-revealed");

    // Ignore clicks if awaiting end of move or tile already revealed
    if (awaitingEndOfMove || revealed === "true" || tileElement === activeTile) {
        return;
    }

    // Flip the tile by changing its background color and image
    tileElement.style.backgroundColor = "white";
    tileElement.style.backgroundImage = `url('${animalImage}')`;

    // If there's no active tile, set the clicked tile as the active tile
    if (!activeTile) {
        activeTile = tileElement;
        return;
    }

    // Retrieve animal of the active tile
    const activeAnimalName = activeTile.getAttribute("data-animal");

    // If the animals match, mark both tiles as revealed
    if (activeAnimalName === animalImage.split('/')[1].split('.')[0]) {
        tileElement.setAttribute("data-revealed", "true");
        activeTile.setAttribute("data-revealed", "true");

        // Reset activeTile and awaitingEndOfMove
        activeTile = null;
        awaitingEndOfMove = false;
        revealedCount += 2;

        // If all tiles are revealed, show a message
        if (revealedCount === tileCount) {
            setTimeout(() => {
                alert("Congratulations!!! You have won the game.");
            }, 500); // Delay to ensure the final tile is shown before the alert
        }

        return;
    }

    // If the animals don't match, wait for 1 second then flip both tiles back
    awaitingEndOfMove = true;

    setTimeout(() => {
        tileElement.style.backgroundColor = null;
        tileElement.style.backgroundImage = '';
        activeTile.style.backgroundColor = null;
        activeTile.style.backgroundImage = '';

        // Reset activeTile and awaitingEndOfMove
        activeTile = null;
        awaitingEndOfMove = false;
    }, 1000);
}

// Function to build and shuffle tiles
function initializeGame() {
    // Clear any existing tiles
    tilesContainer.innerHTML = "";

    // Shuffle and build tiles
    const shuffledAnimals = [...animals, ...animals];
    shuffledAnimals.sort(() => Math.random() - 0.5);

    shuffledAnimals.forEach(animal => {
        buildTile(animal);
    });

    // Reset game variables
    revealedCount = 0;
    activeTile = null;
    awaitingEndOfMove = false;
}

// Function to validate the player name
function validatePlayerName() {
    const playerName = playerNameInput.value.trim();

    // Check if the player name is empty
    if (playerName === "") {
        playerNameError.textContent = "Please enter a player name.";
        playerNameInput.classList.add("error");
        return false;
    } else {
        playerNameError.textContent = "";
        playerNameInput.classList.remove("error");
        return true;
    }
}

// Event listener for input event to validate player name dynamically
playerNameInput.addEventListener("input", validatePlayerName);

// Event listener for form submission
playerForm.addEventListener("submit", function(event) {
    // Prevent the form from submitting if validation fails
    if (!validatePlayerName()) {
        event.preventDefault();
        return;
    }
    // Prevent the default form submission
    event.preventDefault();

    // Initialize the game
    if (!gameStart) {
        initializeGame();
        gameStart = true;
    }

    alert("Player name is valid. Starting the game!");
});
