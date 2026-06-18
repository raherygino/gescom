import { useWindowStore } from "@/stores/window-store";
import { cn } from "@/lib/utils";

interface TrafficLightsProps {
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

export function TrafficLights({ onMinimize, onMaximize, onClose }: TrafficLightsProps) {
  const { focused } = useWindowStore();

  const dotClass = (color: string) =>
    cn(
      "h-3 w-3 rounded-full transition-all duration-150",
      focused ? color : "bg-[#4a4a4a]",
    );

  return (
    <div className="flex items-center gap-2 px-3 no-drag" data-traffic-lights>
      <button
        type="button"
        onClick={onClose}
        className={cn(
          dotClass("bg-[#ff5f57] hover:bg-[#ff5f57] group"),
          "relative",
        )}
        aria-label="Close"
      >
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[8px] font-bold text-[#4d0000]">✕</span>
        </span>
      </button>

      <button
        type="button"
        onClick={onMinimize}
        className={cn(
          dotClass("bg-[#febc2e] hover:bg-[#febc2e] group"),
          "relative",
        )}
        aria-label="Minimize"
      >
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[8px] font-bold text-[#995500]">─</span>
        </span>
      </button>

      <button
        type="button"
        onClick={onMaximize}
        className={cn(
          dotClass("bg-[#28c840] hover:bg-[#28c840] group"),
          "relative",
        )}
        aria-label="Maximize"
      >
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[8px] font-bold text-[#006500]">+</span>
        </span>
      </button>
    </div>
  );
}
