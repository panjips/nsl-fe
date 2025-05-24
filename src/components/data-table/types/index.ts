import {
  createColumnHelper,
  type ColumnDef,
  type Table,
} from "@tanstack/react-table";
import type { z } from "zod";

export type TableRowData = Record<string, any>;

export interface DataTableProps<TData extends TableRowData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  enableDragDrop?: boolean;
  enableRowSelection?: boolean;
  enablePagination?: boolean;
  defaultPageSize?: number;
  isLoading?: boolean;
}

export interface TableContextValue<TData extends TableRowData> {
  table: Table<TData>;
}

export function createTypedColumnHelper<T>() {
  return createColumnHelper<T>();
}

export function createZodColumnHelper<T extends z.ZodType>(schema: T) {
  type SchemaType = z.infer<typeof schema>;
  return createColumnHelper<SchemaType>();
}
