
// Draws a grid of divs within .main-container 
function drawGrid(containerWidth, containerHeight, gridSize) {

  let numRows = gridSize;
  let numCells = numRows; // if there's 3 rows, there's 3 cells per row
  let cellSize = containerWidth / numCells - 2; // Account for border!

  let mainContainerEl = document.querySelector(".grid-container");

  containerWidth = containerWidth.toString();
  containerHeight = containerHeight.toString();

  mainContainerEl.style.width = containerWidth + "px";
  mainContainerEl.style.height = containerHeight + "px";

  for (x = 0; x < numRows; x++) {
    // Create each column
    let rowEl = document.createElement("div");
    rowEl.classList.add("row");

    for (i = 0; i < numCells; i++) {
      // Fill each column with cells across
      let cellEl = document.createElement("div");
      cellEl.classList.add("cell");

      // // Set height and width of each cell
      height = cellSize.toString();
      width = cellSize.toString();

      cellEl.style.height = height + "px";
      cellEl.style.width = width + "px";

      // Add cell to column
      rowEl.appendChild(cellEl);

      
    }
    // Add column to main-container
  
    mainContainerEl.appendChild(rowEl);

  }
  // Ensure active mode remains active
  currentState.resetMode();
}


function setGridSize() {
  gridSize = Number(this.value);
  clearGrid();
  // Update grid size indicator
  updateGridDisplay(gridSize);

  // Redraw grid
  drawGrid(700, 700, gridSize);
 
}


function clearGrid() {
  const allRows = document.querySelectorAll('.row');
  allRows.forEach(row => row.remove());

}


function updateGridDisplay(gridSize) {
  let bigDigit = document.querySelector('.high-digit');
  let smallDigit = document.querySelector('.low-digit');

  bigDigit.textContent = gridSize;
  smallDigit.textContent = 'x' + gridSize;

}


function toggleGridLines() {
  // If grid is showing turn it off
  if (showingGrid) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.style.border = "1px solid #eeeeee");
    // Set latch for next time around
    showingGrid = false;
    // change the icon
    document.getElementById('grid-toggle-icon').src = "assets/grid-off.png";
    



  }else {
    showGridLines();
    showingGrid = true;
    document.getElementById('grid-toggle-icon').src = "assets/grid-on.png";
  }
}


function showGridLines() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.style.border = "1px solid #d5d4d4");

}


function draw() {
  // Set active state
  currentState.activeTool = 'draw';

  // Remove event listeners 
  killEventListeners();

  // Reset menu btns 
  document.querySelectorAll('.nav-links').forEach((link)=>{link.style.color='#575757'})

  // Change nav link to white 
  drawBtn.style.color='white';
  let colorInput = document.getElementById('fg');

  let cells = document.querySelectorAll('.cell');

  function drawCell(e){
    let colorInput = document.getElementById('fg').value;
    e.target.style.backgroundColor = colorInput;

  }
  // Mouseover behavior for draw
  cells.forEach(cell => {cell.addEventListener('mouseover', drawCell, false)});
 
  
}


function erase() {
  currentState.activeTool = 'erase';
  // Remove event listeners 
  killEventListeners();

  // Change nav link to white
  document.querySelectorAll('.nav-links').forEach((link)=>{link.style.color='#575757'})
  eraseBtn.style.color='white';

  function eraseCell(e) {
    e.target.style.backgroundColor = '#eeeeee';

  }
  
  // 'Erase' cell with default color
  let cells = document.querySelectorAll('.cell');
  cells.forEach(cell => { cell.addEventListener('mouseover', eraseCell, false)});

  }


function fill() {
  currentState.activeTool = 'fill';
  // Remove event listeners 
  killEventListeners();

  // Highlight current drawing mode 
  document.querySelectorAll('.nav-links').forEach((link)=>{link.style.color='#575757'});
  fillBtn.style.color='white';

  // Each cell changes to the same color on click
  let cells = document.querySelectorAll('.cell');

  function fillCells() {
    let bgColor = document.getElementById('bg').value;
    cells.forEach(cell => cell.style.backgroundColor = bgColor );
  }

  cells.forEach(cell => cell.addEventListener('click', fillCells, false));

}


function clear() {
  currentState.activeTool = 'clearScreen'
  killEventListeners();

  // Highlight current drawing mode 
  document.querySelectorAll('.nav-links').forEach((link)=>{link.style.color='#575757'})
  clearBtn.style.color = 'white';

  // Fill all cells with default color
  let cells = document.querySelectorAll('.cell');
  cells.forEach(cell => { cell.style.backgroundColor = '#eeeeee'});

}


function killEventListeners() {
  let allCells = document.querySelectorAll('.cell');

  // // Remove event handlers for all functions 
  allCells.forEach((cell)=> {
    // Clone and replace each cell to kill the event listeners 
    cell.replaceWith(cell.cloneNode(false));})
  
  }



// Prototypes //

// Tracks current operational state(draw etc) 
let statusPrototype = {
  activeTool:'',

  // Make sure active tool, remains active after redraw of grid 
  resetMode() {
    let mode = this.activeTool;
    switch(mode) {
      case 'draw':
        draw();
        break;
      case 'erase':
        erase();
        break;
      case 'fill':
        fill();
        break;
      case 'clearScreen':
        clear();
        break;
    }
    
  }
}

let currentState = Object.create(statusPrototype);

// Draw default grid 
drawGrid(700, 700, 2);

// Show grid lines 
let showingGrid = true;

// Active tool to keep track of current operation mode


// Event handlers //

// Adjust grid size on slider change
const rangeInput = document.querySelector('.slider');
rangeInput.addEventListener('input', setGridSize)

// Turn grid lines on and off 
const gridToggler = document.querySelector(".grid-toggle-container");
gridToggler.addEventListener('click', toggleGridLines);

// Switch to draw mode 
const drawBtn = document.querySelector('.draw-btn');
drawBtn.addEventListener('click', draw, false);

// Switch to erase mode 
const eraseBtn = document.querySelector('.erase-btn');
eraseBtn.addEventListener('click', erase, false);

// Switch to fill mode  
const fillBtn = document.querySelector('.fill-btn');
fillBtn.addEventListener('click', fill, false);

// Clear all art from grid 
const clearBtn = document.querySelector('.clear-btn', false);
clearBtn.addEventListener('click', clear, false);

// Color Selectors //

// On click, change background color of swatches 
document.getElementById('fg').addEventListener('change', (e)=>{
  let fgColor = e.target.value;
  document.querySelector('.fg-swatch').style.backgroundColor = fgColor;
});

document.getElementById('bg').addEventListener('change', (e)=>{
  color = e.target.value;
  document.querySelector('.bg-swatch').style.backgroundColor = color;
});


