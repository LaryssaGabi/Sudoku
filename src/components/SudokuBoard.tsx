import { SudokuCell } from "./SudokuCell";
import { getDeepCopy } from "@/utils/sudoku-generator";
import { cn } from "@/lib/utils";

interface SudokuBoardProps {
  sudokuArr: number[][];
  setSudokuArr: (arr: number[][]) => void;
  initialArr: number[][];
  selectedCell: [number, number] | null;
  setSelectedCell: (cell: [number, number] | null) => void;
  errorCells: Set<string>;
  isComplete: boolean;
  isSolved: boolean;
  theme: 'classic' | 'modern' | 'neon' | 'minimal';
}

export const SudokuBoard = ({
  sudokuArr,
  setSudokuArr,
  initialArr,
  selectedCell,
  setSelectedCell,
  errorCells,
  isComplete,
  isSolved,
  theme,
}: SudokuBoardProps) => {
  const deepCopy = getDeepCopy(sudokuArr);

  const onInputChange = (value: string, row: number, col: number) => {
    let num = parseInt(value) || -1;
    const grid = deepCopy;
    if (num === -1 || (num >= 1 && num <= 9)) {
      grid[row][col] = num;
    }
    setSudokuArr(grid);
  };

  const themeClasses = {
    classic: "bg-card shadow-md",
    modern: "bg-gradient-to-br from-card to-secondary shadow-lg",
    neon: "bg-card shadow-glow border-2 border-primary/20",
    minimal: "bg-card shadow-sm border border-border",
  };

  return (
    <div
      className={cn(
        "inline-block p-2 rounded-xl transition-all duration-500",
        themeClasses[theme],
        isComplete && "animate-pulse-glow"
      )}
    >
      <div className="grid grid-cols-9 gap-0 w-[min(90vw,450px)] aspect-square border-2 border-grid-section rounded-lg overflow-hidden bg-background">
        {Array.from({ length: 9 }).map((_, row) =>
          Array.from({ length: 9 }).map((_, col) => {
            const cellKey = `${row}-${col}`;
            const isSelected = selectedCell?.[0] === row && selectedCell?.[1] === col;
            const isError = errorCells.has(cellKey);
            const isDisabled = initialArr[row][col] !== -1;
            
            // Célula foi resolvida = não era original E isSolved está ativo
            const cellWasSolved = isSolved && initialArr[row][col] === -1;

            return (
              <div
                key={cellKey}
                onClick={() => !isDisabled && setSelectedCell([row, col])}
                className="relative"
              >
                <SudokuCell
                  value={sudokuArr[row][col]}
                  onChange={(value) => onInputChange(value, row, col)}
                  disabled={isDisabled || isSolved}
                  isSelected={isSelected}
                  isError={isError}
                  isSuccess={isComplete}
                  isSolved={cellWasSolved}
                  row={row}
                  col={col}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};