import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface InfoTooltipProps {
  content: string
  iconSize?: number
  className?: string
}

export function InfoTooltip({ content, iconSize = 16, className = "" }: InfoTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <button
            className={`inline-flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
            type="button"
            aria-label="More information"
          >
            <Info className="text-muted-foreground" size={iconSize} />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-sm">{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
