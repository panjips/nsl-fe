import { createTypedColumnHelper } from "@/components/data-table/types";
import type { UserWithRole } from "../domain";
import type { ColumnHelper } from "@tanstack/react-table";
import { TableActions } from "@/components/dropdown-table-action";

export const userColumnHelper = createTypedColumnHelper<UserWithRole>();

export interface SetupUserColumns {
  columnHelper: ColumnHelper<UserWithRole>;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

export const setupUserColumns = ({
  columnHelper,
  onEdit,
  onDelete,
}: SetupUserColumns) => {
  return [
    columnHelper.accessor("id", {
      header: "ID User",
      meta: {
        headColStyle: {
          textAlign: "left",
          fontWeight: "bold",
        },
        bodyColStyle: {
          textAlign: "left",
        },
      },
      cell: ({ row }) => {
        return <div>{row.original.id}</div>;
      },
    }),
    columnHelper.accessor("name", {
      header: "Name",
      meta: {
        headColStyle: {
          textAlign: "left",
          fontWeight: "bold",
        },
        bodyColStyle: {
          textAlign: "left",
        },
      },
      cell: ({ row }) => {
        return <div>{row.original.name}</div>;
      },
    }),
    columnHelper.accessor("email", {
      header: "Email",
      meta: {
        headColStyle: {
          textAlign: "left",
          fontWeight: "bold",
        },
        bodyColStyle: {
          textAlign: "left",
        },
      },
      cell: ({ row }) => {
        return <div>{row.original.email}</div>;
      },
    }),
    columnHelper.accessor("username", {
      header: "Username",
      meta: {
        headColStyle: {
          textAlign: "left",
          fontWeight: "bold",
        },
        bodyColStyle: {
          textAlign: "left",
        },
      },
      cell: ({ row }) => {
        return <div>{row.original.username}</div>;
      },
    }),
    columnHelper.accessor("phone_number", {
      header: "Phone Number",
      meta: {
        headColStyle: {
          textAlign: "left",
          fontWeight: "bold",
        },
        bodyColStyle: {
          textAlign: "left",
        },
      },
      cell: ({ row }) => {
        return <div>{row.original.phone_number}</div>;
      },
    }),
    columnHelper.accessor("role.name", {
      header: "Role",
      meta: {
        headColStyle: {
          textAlign: "left",
          fontWeight: "bold",
        },
        bodyColStyle: {
          textAlign: "left",
        },
      },
      cell: ({ row }) => {
        return <div>{row.original.role.name}</div>;
      },
    }),
    columnHelper.display({
      id: "actions",
      cell: ({ row }) => {
        if (row.original.role.name === "Pemilik") {
          return null;
        }
        return (
          <TableActions
            id={row.original.id}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      },
    }),
  ];
};
