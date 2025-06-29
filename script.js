// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Tile size
const TILE_SIZE = 32;

// Map: 14x14 grid (448x448)
const map = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,3,3,3,3,2,2,3,3,3,3,2,1],
  [1,2,3,1,1,3,2,2,3,1,1,3,2,1],
  [1,2,3,1,1,3,2,2,3,1,1,3,2,1],
  [1,2,3,3,3,3,2,2,3,3,3,3,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,3,3,3,3,2,2,3,3,3,3,2,1],
  [1,2,3,1,1,3,2,2,3,1,1,3,2,1],
  [1,2,3,1,1,3,2,2,3,1,1,3,2,1],
  [1,2,3,3,3,3,2,2,3,3,3,3,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// 0: empty, 1: tree, 2: path, 3: grass

// Load images
const tiles = {
  1: new Image(),
  2: new Image(),
  3: new Image(),
};
tiles[1].src = "img/tree.png";
tiles[2].src = "img/path.png";
tiles[3].src = "img/grass.jpg";

const playerImg = new Image();
playerImg.src = "img/player.png";

// Player
const player = {
  x: 2,
  y: 2,
};

// Controls
const keys = {};
document.addEventListener("keydown", (e) => keys[e.code] = true);
document.addEventListener("keyup", (e) => keys[e.code] = false);

function update() {
  if (keys["ArrowUp"]) move(0, -1);
  if (keys["ArrowDown"]) move(0, 1);
  if (keys["ArrowLeft"]) move(-1, 0);
  if (keys["ArrowRight"]) move(1, 0);
}

function move(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;

  // Prevent going out of bounds
  if (newX < 0 || newY < 0 || newX >= map[0].length || newY >= map.length) return;

  // Tile check: can't walk through trees
  const tile = map[newY][newX];
  if (tile === 1) return;

  player.x = newX;
  player.y = newY;

  // Check grass
  if (tile === 3 && Math.random() < 0.2) {
    alert("🌿 A wild monster appeared!");
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw map
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const tile = map[y][x];
      if (tile) {
        ctx.drawImage(tiles[tile], x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }

  // Draw player
  ctx.drawImage(playerImg, player.x * TILE_SIZE, player.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
