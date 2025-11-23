import { Button } from "@/components/ui/button";
import { 
  RefreshCw, 
  CheckCircle, 
  Lightbulb, 
  Palette,
  Sparkles 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GameControlsProps {
  onCheck: () => void;
  onSolve: () => void;
  onReset: () => void;
  onNewGame: () => void;
  onChangeTheme: () => void;
  isComplete: boolean;
  theme: 'classic' | 'modern' | 'neon' | 'minimal';
}

export const GameControls = ({
  onCheck,
  onSolve,
  onReset,
  onNewGame,
  onChangeTheme,
  isComplete,
  theme,
}: GameControlsProps) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={onCheck}
          variant="default"
          size="lg"
          className="gap-2 font-semibold"
          disabled={isComplete}
        >
          <CheckCircle className="w-5 h-5" />
          Verificar
        </Button>
        <Button
          onClick={onSolve}
          variant="secondary"
          size="lg"
          className="gap-2 font-semibold"
          disabled={isComplete}
        >
          <Lightbulb className="w-5 h-5" />
          Resolver
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <Button
          onClick={onReset}
          variant="outline"
          size="default"
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Resetar
        </Button>
        <Button
          onClick={onNewGame}
          variant="outline"
          size="default"
          className={cn(
            "gap-2 font-semibold",
            isComplete && "animate-bounce-soft bg-success text-success-foreground hover:bg-success/90"
          )}
        >
          <Sparkles className="w-4 h-4" />
          Novo Jogo
        </Button>
        <Button
          onClick={onChangeTheme}
          variant="outline"
          size="default"
          className="gap-2"
        >
          <Palette className="w-4 h-4" />
          Tema
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground mt-2">
        <span className="font-medium">Tema atual:</span>{" "}
        <span className="capitalize">{theme}</span>
      </div>
    </div>
  );
};
