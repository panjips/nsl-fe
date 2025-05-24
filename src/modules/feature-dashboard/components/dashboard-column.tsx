import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { MoreVertical, CheckCircle, Loader } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { createZodColumnHelper } from "@/components/data-table/types";
import { TableDashboardSchema, type TableDashboardSchemaType } from "../data";
import type { ColumnHelper } from "@tanstack/react-table";

export const dashboardColumnHelper =
  createZodColumnHelper(TableDashboardSchema);

export interface SetupDashboardColumnsProps {
  columnHelper: ColumnHelper<TableDashboardSchemaType>;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onStatusChange?: (id: number, status: string) => void;
}

export const setupDashboardColumns = ({
  columnHelper,
  onEdit,
  onDelete,
}: SetupDashboardColumnsProps) => {
  return [
    // Header column
    columnHelper.accessor("header", {
      header: "Header",
      cell: ({ row }) => {
        return <TableCellViewer item={row.original} />;
      },
      enableHiding: false,
    }),

    // Type column
    columnHelper.accessor("type", {
      header: "Section Type",
      cell: ({ row }) => (
        <div className="w-32">
          <Badge variant="outline" className="text-muted-foreground px-1.5">
            {row.original.type}
          </Badge>
        </div>
      ),
    }),

    // Status column
    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.status === "Done" ? (
            <CheckCircle className="fill-green-500 dark:fill-green-400" />
          ) : (
            <Loader />
          )}
          {row.original.status}
        </Badge>
      ),
    }),

    // Target column
    columnHelper.accessor("target", {
      header: () => <div className="font-bold">Target</div>,
      cell: ({ row }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
              loading: `Saving ${row.original.header}`,
              success: "Done",
              error: "Error",
            });
          }}
        >
          <Label htmlFor={`${row.original.id}-target`} className="sr-only">
            Target
          </Label>
          <Input
            className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
            defaultValue={row.original.target}
            id={`${row.original.id}-target`}
          />
        </form>
      ),
    }),

    columnHelper.accessor("limit", {
      header: () => <div className="w-full text-right">Limit</div>,
      cell: ({ row }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
              loading: `Saving ${row.original.header}`,
              success: "Done",
              error: "Error",
            });
          }}
        >
          <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
            Limit
          </Label>
          <Input
            className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
            defaultValue={row.original.limit}
            id={`${row.original.id}-limit`}
          />
        </form>
      ),
    }),

    columnHelper.accessor("reviewer", {
      header: "Reviewer",
      cell: ({ row }) => {
        const isAssigned = row.original.reviewer !== "Assign reviewer";

        if (isAssigned) {
          return row.original.reviewer;
        }

        return (
          <>
            <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
              Reviewer
            </Label>
            <Select>
              <SelectTrigger
                className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
                size="sm"
                id={`${row.original.id}-reviewer`}
              >
                <SelectValue placeholder="Assign reviewer" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                <SelectItem value="Jamik Tashpulatov">
                  Jamik Tashpulatov
                </SelectItem>
              </SelectContent>
            </Select>
          </>
        );
      },
    }),

    columnHelper.display({
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <MoreVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem onClick={() => onEdit?.(row.original.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDelete?.(row.original.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }),
  ];
};

function TableCellViewer({ item }: { item: TableDashboardSchemaType }) {
  return <div className="font-medium">{item.header}</div>;
}
