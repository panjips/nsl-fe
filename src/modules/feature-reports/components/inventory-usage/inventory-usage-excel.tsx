import ExcelJS from "exceljs";
import type { InventoryUsageReport } from "../../domain/inventory";
import { saveAs } from "file-saver";

export const generateInventoryUsageExcel = async (
    data: InventoryUsageReport[],
    dateRange: string,
    fileName: string = `Inventory_Usage_Report_${dateRange.replace(/\s+/g, "_")}.xlsx`,
): Promise<void> => {
    const workbook = new ExcelJS.Workbook();

    workbook.creator = "NSL Inventory Report";
    workbook.lastModifiedBy = "NSL Inventory Report System";
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.addWorksheet("Inventory Usage Report", {
        pageSetup: {
            paperSize: 9,
            orientation: "portrait",
            margins: {
                left: 0.7,
                right: 0.7,
                top: 0.75,
                bottom: 0.75,
                header: 0.3,
                footer: 0.3,
            },
        },
    });

    worksheet.columns = [{ width: 10 }, { width: 40 }, { width: 15 }, { width: 15 }, { width: 15 }];

    let currentRow = 1;

    const titleCell = worksheet.getCell("A1");
    titleCell.value = "INVENTORY USAGE REPORT";
    titleCell.font = { size: 20, bold: true, color: { argb: "1e40af" } };
    titleCell.alignment = { horizontal: "center", vertical: "middle" };
    worksheet.mergeCells("A1:E1");

    const dateCell = worksheet.getCell("A2");
    dateCell.value = dateRange;
    dateCell.font = { size: 12, italic: true, color: { argb: "6b7280" } };
    dateCell.alignment = { horizontal: "center" };
    worksheet.mergeCells("A2:E2");

    currentRow = 4;

    const inventoryTitleCell = worksheet.getCell(`A${currentRow}`);
    inventoryTitleCell.value = "INVENTORY ITEMS USAGE";
    inventoryTitleCell.font = { size: 14, bold: true, color: { argb: "1f2937" } };
    inventoryTitleCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f8fafc" },
    };
    inventoryTitleCell.border = {
        left: { style: "thick", color: { argb: "3b82f6" } },
        top: { style: "thin", color: { argb: "e5e7eb" } },
        bottom: { style: "thin", color: { argb: "e5e7eb" } },
        right: { style: "thin", color: { argb: "e5e7eb" } },
    };
    worksheet.mergeCells(`A${currentRow}:E${currentRow}`);
    currentRow++;

    const headers = ["ID", "Item Name", "Unit", "Usage", "Current Stock"];
    headers.forEach((header, index) => {
        const cell = worksheet.getCell(currentRow, index + 1);
        cell.value = header;
        cell.font = { bold: true, color: { argb: "374151" } };
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "f8fafc" },
        };
        cell.border = {
            top: { style: "medium", color: { argb: "d1d5db" } },
            bottom: { style: "medium", color: { argb: "d1d5db" } },
            left: { style: "thin", color: { argb: "e5e7eb" } },
            right: { style: "thin", color: { argb: "e5e7eb" } },
        };
        cell.alignment = { horizontal: "center", vertical: "middle" };
    });
    currentRow++;

    data.forEach((item, index) => {
        const isEvenRow = index % 2 === 0;

        const idCell = worksheet.getCell(currentRow, 1);
        idCell.value = item.id;
        idCell.alignment = { horizontal: "center", vertical: "middle" };

        const nameCell = worksheet.getCell(currentRow, 2);
        nameCell.value = item.name;
        nameCell.alignment = { horizontal: "left", vertical: "middle" };

        const unitCell = worksheet.getCell(currentRow, 3);
        unitCell.value = item.unit;
        unitCell.alignment = { horizontal: "center", vertical: "middle" };

        const usageCell = worksheet.getCell(currentRow, 4);
        usageCell.value = `${item.total_quantity_used} ${item.unit}`;
        usageCell.alignment = { horizontal: "right", vertical: "middle" };

        const stockCell = worksheet.getCell(currentRow, 5);
        stockCell.value = `${item.current_stock} ${item.unit}`;
        stockCell.alignment = { horizontal: "right", vertical: "middle" };

        const rowCells = [idCell, nameCell, unitCell, usageCell, stockCell];
        rowCells.forEach((cell) => {
            if (!isEvenRow) {
                cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "f9fafb" },
                };
            }
            cell.border = {
                top: { style: "thin", color: { argb: "f3f4f6" } },
                bottom: { style: "thin", color: { argb: "f3f4f6" } },
                left: { style: "thin", color: { argb: "e5e7eb" } },
                right: { style: "thin", color: { argb: "e5e7eb" } },
            };
        });

        currentRow++;
    });

    currentRow += 1;

    const summaryCell = worksheet.getCell(currentRow, 1);
    summaryCell.value = `Total Items: ${data.length}`;
    summaryCell.font = { bold: true, size: 12, color: { argb: "374151" } };
    worksheet.mergeCells(`A${currentRow}:E${currentRow}`);
    summaryCell.alignment = { horizontal: "right", vertical: "middle" };

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, fileName);
};
