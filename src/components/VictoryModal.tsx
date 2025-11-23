import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Trophy } from "lucide-react";

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewGame: () => void;
}

export const VictoryModal = ({ isOpen, onClose, onNewGame }: VictoryModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Trophy className="w-20 h-20 text-primary animate-bounce-soft" />
              <Sparkles className="w-8 h-8 text-accent absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Parabéns! 🎉
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Você completou o Sudoku com sucesso!
            <br />
            <span className="text-foreground font-semibold mt-2 block">
              Pronto para um novo desafio?
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 mt-4">
          <Button
            onClick={() => {
              onNewGame();
              onClose();
            }}
            size="lg"
            className="w-full gap-2 font-semibold"
          >
            <Sparkles className="w-5 h-5" />
            Novo Jogo
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Continuar Admirando
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
