Memory Matching Game Designed Using DOM and BOM properties.
buildTile(animal): Creates a tile element based on the provided animal object and adds it to the game grid.
handleTileClick(tileElement, animalName): Handles the logic when a tile is clicked. It flips the tile, checks for matches, and handles the end of the move.
An event listener is added to each tile to handle clicks.
Another event listener is added to the form for submitting the player's name, with validation to ensure it's not empty.
Uses the parent-child-sibling relationship.Used appendChild 
Game logic defines an array of objects representing animals, each object containing a name and an image path.
It duplicates this array to create a list of animals for the game.
It sets up variables to keep track of the game state, like revealedCount, activeTile, and awaitingEndOfMove.
This game allows players to flip two tiles at a time, attempting to match pairs of animals until all tiles are revealed. It also prompts players to enter their name before starting the game. The game ends when all pairs are found.