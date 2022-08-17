function drawGrid(containerWidth, gridDimensions) {
    let gridWidth = gridDimensions[0];
    let gridHeight = gridDimensions[1];

    let cols = gridWidth;
    let numCells = cols; // e.g. 3x3 is 3 columns with 3 cells each
    let cellSize = containerWidth / cols; 

    let mainContainerEl = document.querySelector('.main-container');

    for (x=0; x<cols; x++) {
        // Create each column
        let columnEl = document.createElement('div');
        columnEl.classList.add('column');

        for(i=0; i<numCells; i++){
            // Fill each column with cells 
            let cellEl = document.createElement('div');
            cellEl.classList.add('cell');
            
            // Set height and width of each cell
            height = cellSize.toString();
            width = cellSize.toString();

            cellEl.style.height = height + 'px';
            cellEl.style.width = width + 'px';

            // Add cell to column
            columnEl.appendChild(cellEl);
        }
        // Add column to main-container
        mainContainerEl.appendChild(columnEl);
    }
}

drawGrid(500, [3,3]);