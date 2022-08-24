// Draws a grid of divs within .main-container testing comment
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
}
 

function clearGrid() {
  const allRows = document.querySelectorAll('.row');
  allRows.forEach(row => row.remove());

}


function setGridSize() {
  gridSize = Number(this.value);
  clearGrid();
  // update grid size indicator
  updateGridDisplay(gridSize);
  drawGrid(700, 700, gridSize);
 
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


// MAIN 
let showingGrid = true;

const rangeInput = document.querySelector('.slider');
rangeInput.addEventListener('input', setGridSize)

const gridToggler = document.querySelector(".grid-toggle-container");
gridToggler.addEventListener('click', toggleGridLines);




// // Draw default grid 
drawGrid(700,700, 2);
