import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

export interface CustomAction {
  label: string;
  onClick: (id: string | number) => void;
  variant?: "default" | "destructive";
  icon?: React.ReactNode;
  separator?: boolean;
}

export interface TableActionsProps {
  id: string | number;
  onDetail?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  customActions?: CustomAction[];
  triggerButton?: React.ReactNode;
  align?: "center" | "end" | "start";
  width?: string;
}

export const TableActions: React.FC<TableActionsProps> = ({
  id,
  onDetail,
  onEdit,
  onDelete,
  customActions = [],
  triggerButton,
  align = "end",
  width = "w-40",
}) => {
  const hasStandardActions = onDetail || onEdit || onDelete;
  const hasCustomActions = customActions && customActions.length > 0;
  const needsSeparator = hasStandardActions && hasCustomActions;
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Safely handle actions and close dropdown
  const handleAction = (
    action: (id: string | number) => void,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    // Close dropdown before executing action
    setIsOpen(false);

    // Ensure we maintain focus on the trigger after closing
    if (triggerRef.current) {
      triggerRef.current.focus();
    }

    // Execute after dropdown is closed
    setTimeout(() => {
      action(id);
    }, 10);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        {triggerButton ? (
          triggerButton
        ) : (
          <Button
            ref={triggerRef}
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className={width}
        onEscapeKeyDown={() => setIsOpen(false)}
        onInteractOutside={() => setIsOpen(false)}
        onPointerDownOutside={(e) => {
          if (!isOpen) e.preventDefault();
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          if (triggerRef.current) {
            triggerRef.current.focus();
          }
        }}
      >
        {onDetail && (
          <DropdownMenuItem onClick={(e) => handleAction(onDetail, e)}>
            Detail
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={(e) => handleAction(onEdit, e)}>
            Edit
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem
            variant="destructive"
            onClick={(e) => handleAction(onDelete, e)}
          >
            Delete
          </DropdownMenuItem>
        )}

        {needsSeparator && <DropdownMenuSeparator />}

        {customActions.map((action, index) => (
          <div key={`${action.label}-${index}`}>
            {action.separator && <DropdownMenuSeparator />}
            <DropdownMenuItem
              variant={action.variant || "default"}
              onClick={(e) => handleAction(action.onClick, e)}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
