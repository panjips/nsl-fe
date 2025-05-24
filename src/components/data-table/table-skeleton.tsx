import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
  columnCount?: number;
  rowCount?: number;
  showCheckbox?: boolean;
}

export function TableSkeleton({
  columnCount = 5,
  rowCount = 10,
  showCheckbox = true,
}: TableSkeletonProps) {
  const rows = Array(rowCount).fill(null);
  const columns = Array(showCheckbox ? columnCount + 1 : columnCount).fill(
    null
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            {columns.map((_, idx) => (
              <TableHead key={idx}>
                <Skeleton className="h-4 w-[80%]" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((_, rowIdx) => (
            <TableRow key={rowIdx} className="animate-pulse">
              {columns.map((_, colIdx) => (
                <TableCell key={colIdx}>
                  {colIdx === 0 && showCheckbox ? (
                    <div className="flex items-center justify-center">
                      <Skeleton className="h-4 w-4 rounded" />
                    </div>
                  ) : colIdx === 1 ? (
                    <Skeleton className="h-4 w-28" />
                  ) : colIdx === columns.length - 1 ? (
                    <div className="flex justify-end">
                      <Skeleton className="h-4 w-8 rounded-full" />
                    </div>
                  ) : (
                    <Skeleton className="h-4 w-full max-w-[200px]" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
