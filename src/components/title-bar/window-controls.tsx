import { useWindowStore } from "@/stores/window-store";
import { Minus, Square, Maximize2, X } from "lucide-react";

interface WindowControlsProps {
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

export function WindowControls({ onMinimize, onMaximize, onClose }: WindowControlsProps) {
  const { maximized } = useWindowStore();

  const btnClass =
    "flex items-center justify-center w-[46px] h-full transition-colors duration-150 text-muted-foreground hover:text-foreground no-drag";

  return (
    <div className="flex h-full items-stretch no-drag">
      <button
        type="button"
        className={btnClass + " hover:bg-accent"}
        onClick={onMinimize}
        aria-label="Minimize"
      >
        <Minus className="h-4 w-4" />
      </button>

      <button
        type="button"
        className={btnClass + " hover:bg-accent"}
        onClick={onMaximize}
        aria-label={maximized ? "Restore" : "Maximize"}
      >
        {maximized ? (
          <Square className="h-3.5 w-3.5" />
        ) : (
          <Maximize2 className="h-3.5 w-3.5" />
        )}
      </button>

      <button
        type="button"
        className={
          btnClass +
          " hover:bg-destructive hover:text-destructive-foreground group"
        }
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
