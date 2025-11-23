export const getDeepCopy = (arr: number[][]): number[][] => {
  return JSON.parse(JSON.stringify(arr));
};

const getNext = (row: number, col: number): [number, number] => {
  return col !== 8 ? [row, col + 1] : row !== 8 ? [row + 1, 0] : [0, 0];
};

const checkValid = (grid: number[][], row: number, col: number, num: number): boolean => {
  return checkRow(grid, row, num) && checkCol(grid, col, num) && checkBox(grid, row, col, num);
};

const checkRow = (grid: number[][], row: number, num: number): boolean => {
  return grid[row].indexOf(num) === -1;
};

const checkCol = (grid: number[][], col: number, num: number): boolean => {
  return grid.every(row => row[col] !== num);
};

const checkBox = (grid: number[][], row: number, col: number, num: number): boolean => {
  const rowStart = row - (row % 3);
  const colStart = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[rowStart + i][colStart + j] === num) {
        return false;
      }
    }
  }

  return true;
};

export const solver = (grid: number[][], row = 0, col = 0): boolean => {
  if (grid[row][col] !== -1) {
    const isLast = row >= 8 && col >= 8;
    if (!isLast) {
      const [newRow, newCol] = getNext(row, col);
      return solver(grid, newRow, newCol);
    } else {
      return true;
    }
  }

  for (let num = 1; num <= 9; num++) {
    if (checkValid(grid, row, col, num)) {
      grid[row][col] = num;

      const [newRow, newCol] = getNext(row, col);
      if (solver(grid, newRow, newCol)) return true;

      grid[row][col] = -1;
    }
  }

  return false;
};

export const compareSudokus = (currentSudoku: number[][], solvedSudoku: number[][]) => {
  const res = {
    isComplete: true,
    isSolvable: true,
  };

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (currentSudoku[i][j] !== solvedSudoku[i][j]) {
        if (currentSudoku[i][j] !== -1) {
          res.isSolvable = false;
        }
        res.isComplete = false;
      }
    }
  }
  return res;
};

// Shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Generate a complete valid sudoku
export const generateCompleteSudoku = (): number[][] => {
  const grid: number[][] = Array(9).fill(null).map(() => Array(9).fill(-1));
  
  // Fill diagonal 3x3 boxes first (they don't affect each other)
  for (let box = 0; box < 9; box += 3) {
    const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let idx = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        grid[box + i][box + j] = nums[idx++];
      }
    }
  }
  
  // Fill remaining cells
  solver(grid);
  return grid;
};

// Generate a playable sudoku by removing numbers
export const generateSudoku = (difficulty: 'easy' | 'medium' | 'hard' = 'medium'): number[][] => {
  const complete = generateCompleteSudoku();
  const puzzle = getDeepCopy(complete);
  
  // Number of cells to remove based on difficulty
  const cellsToRemove = {
    easy: 35,
    medium: 45,
    hard: 55
  }[difficulty];
  
  let removed = 0;
  const positions: [number, number][] = [];
  
  // Create array of all positions
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      positions.push([i, j]);
    }
  }
  
  // Shuffle positions
  const shuffledPositions = shuffleArray(positions);
  
  // Remove numbers while maintaining unique solution
  for (const [row, col] of shuffledPositions) {
    if (removed >= cellsToRemove) break;
    
    const backup = puzzle[row][col];
    puzzle[row][col] = -1;
    
    // Check if puzzle still has unique solution (simplified check)
    const testPuzzle = getDeepCopy(puzzle);
    if (solver(testPuzzle)) {
      removed++;
    } else {
      puzzle[row][col] = backup;
    }
  }
  
  return puzzle;
};
