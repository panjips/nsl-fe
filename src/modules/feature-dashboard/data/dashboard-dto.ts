import { z } from "zod";

export const TableDashboardSchema = z.object({
    id: z.number(),
    header: z.string(),
    type: z.string(),
    status: z.string(),
    target: z.string(),
    limit: z.string(),
    reviewer: z.string(),
});

export type TableDashboardSchemaType = z.infer<typeof TableDashboardSchema>;
