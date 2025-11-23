import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface SudokuCellProps {
  value: number;
  onChange: (value: string) => void;
  disabled: boolean;
  isSelected: boolean;
  isError: boolean;
  isSuccess: boolean;
  isSolved: boolean;
  row: number;
  col: number;
}

export const SudokuCell = ({
  value,
  onChange,
  disabled,
  isSelected,
  isError,
  isSuccess,
  isSolved,
  row,
  col,
}: SudokuCellProps) => {
  return (
    <Input
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value === -1 ? "" : value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      style={isSolved ? { color: '#000000' } : undefined}
      className={cn(
        "w-full h-full text-center text-lg font-semibold border-0 rounded-none",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:z-10",
        "transition-all duration-200",
        // Células originais (disabled desde o início)
        !isSolved && disabled && "bg-cell-initial text-foreground font-bold cursor-not-allowed",
        // Células editáveis (usuário pode preencher)
        !disabled && !isSolved && "bg-cell-default text-primary",
        // Células resolvidas automaticamente - força cor preta
        isSolved && "bg-cell-default !text-black font-bold",
        isSelected && "bg-cell-selected ring-2 ring-primary",
        isError && "bg-cell-error text-destructive animate-wiggle",
        isSuccess && !isSolved && "bg-cell-success text-success-foreground",
        // Força cor preta no final para ter prioridade máxima
        isSolved && "!text-black",
        col % 3 === 2 && col !== 8 && "border-r-2 border-grid-section",
        row % 3 === 2 && row !== 8 && "border-b-2 border-grid-section",
        (col % 3 !== 2 || col === 8) && "border-r border-grid-line",
        (row % 3 !== 2 || row === 8) && "border-b border-grid-line"
      )}
    />
  );
};