import { useState, useEffect } from "react";
import { SudokuBoard } from "@/components/SudokuBoard";
import { GameControls } from "@/components/GameControls";
import { VictoryModal } from "@/components/VictoryModal";
import {
  generateSudoku,
  getDeepCopy,
  solver,
  compareSudokus,
} from "@/utils/sudoku-generator";
import { useToast } from "@/hooks/use-toast";
import { Brain } from "lucide-react";

type Theme = 'classic' | 'modern' | 'neon' | 'minimal';

const Index = () => {
  const [initialArr, setInitialArr] = useState<number[][]>([]);
  const [sudokuArr, setSudokuArr] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [errorCells, setErrorCells] = useState<Set<string>>(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [theme, setTheme] = useState<Theme>('modern');
  const { toast } = useToast();

  // Initialize new game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newPuzzle = generateSudoku('medium');
    setInitialArr(getDeepCopy(newPuzzle));
    setSudokuArr(getDeepCopy(newPuzzle));
    setIsComplete(false);
    setIsSolved(false);
    setShowVictory(false);
    setErrorCells(new Set());
    setSelectedCell(null);
  };

  const checkSudoku = () => {
    const sudoku = getDeepCopy(initialArr);
    solver(sudoku);
    const result = compareSudokus(sudokuArr, sudoku);

    // Find error cells
    const errors = new Set<string>();
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (
          sudokuArr[i][j] !== -1 &&
          sudokuArr[i][j] !== sudoku[i][j]
        ) {
          errors.add(`${i}-${j}`);
        }
      }
    }
    setErrorCells(errors);

    if (result.isComplete) {
      setIsComplete(true);
      setShowVictory(true);
      toast({
        title: "🎉 Incrível!",
        description: "Você completou o Sudoku perfeitamente!",
        variant: "default",
      });
    } else if (result.isSolvable) {
      toast({
        title: "Continue tentando!",
        description: errors.size > 0 
          ? `${errors.size} célula(s) com erro encontrada(s).`
          : "Você está no caminho certo!",
        variant: "default",
      });
    } else {
      toast({
        title: "Ops!",
        description: "O Sudoku não pode ser resolvido com esses números. Tente novamente.",
        variant: "destructive",
      });
    }

    // Clear errors after 2 seconds
    if (errors.size > 0) {
      setTimeout(() => setErrorCells(new Set()), 2000);
    }
  };

  const solveSudoku = () => {
    const sudoku = getDeepCopy(initialArr);
    solver(sudoku);
    setSudokuArr(sudoku);
    setIsComplete(true);
    setIsSolved(true);
    toast({
      title: "Sudoku Resolvido!",
      description: "Aqui está a solução completa.",
      variant: "default",
    });
  };

  const resetSudoku = () => {
    setSudokuArr(getDeepCopy(initialArr));
    setIsComplete(false);
    setIsSolved(false);
    setErrorCells(new Set());
    setSelectedCell(null);
    toast({
      title: "Jogo Resetado",
      description: "Voltamos ao início!",
    });
  };

  const cycleTheme = () => {
    const themes: Theme[] = ['classic', 'modern', 'neon', 'minimal'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    toast({
      title: "Tema Alterado",
      description: `Tema: ${nextTheme}`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 gap-6 animate-fade-in">
      <div className="text-center space-y-2 animate-slide-up">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Brain className="w-10 h-10 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Sudoku Master
          </h1>
        </div>
        <p className="text-muted-foreground text-sm md:text-base">
          Desafie sua mente com puzzles únicos e aleatórios
        </p>
      </div>

      {sudokuArr.length > 0 && (
        <>
          <SudokuBoard
            sudokuArr={sudokuArr}
            setSudokuArr={setSudokuArr}
            initialArr={initialArr}
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
            errorCells={errorCells}
            isComplete={isComplete}
            isSolved={isSolved}
            theme={theme}
          />

          <GameControls
            onCheck={checkSudoku}
            onSolve={solveSudoku}
            onReset={resetSudoku}
            onNewGame={startNewGame}
            onChangeTheme={cycleTheme}
            isComplete={isComplete}
            theme={theme}
          />
        </>
      )}

      <VictoryModal
        isOpen={showVictory}
        onClose={() => setShowVictory(false)}
        onNewGame={startNewGame}
      />
    </div>
  );
};

export default Index;
