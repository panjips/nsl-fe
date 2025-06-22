import ExcelJS from "exceljs";
import type { InventoryPurchaseReport } from "../../domain/inventory";
import { saveAs } from "file-saver";

export const generateInventoryPurchaseExcel = async (
    data: InventoryPurchaseReport[],
    dateRange: string,
    fileName: string = `Inventory_Purchase_Report_${dateRange.replace(/\s+/g, "_")}.xlsx`,
): Promise<void> => {
    const workbook = new ExcelJS.Workbook();

    workbook.creator = "NSL Inventory Report";
    workbook.lastModifiedBy = "NSL Inventory Report System";
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.addWorksheet("Inventory Purchase Report", {
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

    worksheet.columns = [
        { width: 10 }, // ID
        { width: 40 }, // Name
        { width: 15 }, // Unit
        { width: 15 }, // Quantity Purchased
        { width: 15 }, // Total Cost
        { width: 15 }, // Current Stock
    ];

    let currentRow = 1;

    const titleCell = worksheet.getCell("A1");
    titleCell.value = "INVENTORY PURCHASE REPORT";
    titleCell.font = { size: 20, bold: true, color: { argb: "1e40af" } };
    titleCell.alignment = { horizontal: "center", vertical: "middle" };
    worksheet.mergeCells("A1:F1");

    const dateCell = worksheet.getCell("A2");
    dateCell.value = dateRange;
    dateCell.font = { size: 12, italic: true, color: { argb: "6b7280" } };
    dateCell.alignment = { horizontal: "center" };
    worksheet.mergeCells("A2:F2");

    currentRow = 4;

    const inventoryTitleCell = worksheet.getCell(`A${currentRow}`);
    inventoryTitleCell.value = "INVENTORY ITEMS PURCHASE";
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
    worksheet.mergeCells(`A${currentRow}:F${currentRow}`);
    currentRow++;

    const headers = ["ID", "Item Name", "Unit", "Quantity Purchased", "Total Cost", "Current Stock"];
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

    let totalCost = 0;

    data.forEach((item, index) => {
        const isEvenRow = index % 2 === 0;
        totalCost += item.total_cost;

        const idCell = worksheet.getCell(currentRow, 1);
        idCell.value = item.id;
        idCell.alignment = { horizontal: "center", vertical: "middle" };

        const nameCell = worksheet.getCell(currentRow, 2);
        nameCell.value = item.name;
        nameCell.alignment = { horizontal: "left", vertical: "middle" };

        const unitCell = worksheet.getCell(currentRow, 3);
        unitCell.value = item.unit;
        unitCell.alignment = { horizontal: "center", vertical: "middle" };

        const quantityCell = worksheet.getCell(currentRow, 4);
        quantityCell.value = `${item.total_quantity_purchased} ${item.unit}`;
        quantityCell.alignment = { horizontal: "right", vertical: "middle" };

        const costCell = worksheet.getCell(currentRow, 5);
        costCell.value = item.total_cost;
        costCell.numFmt = '"Rp "#,##0';
        costCell.alignment = { horizontal: "right", vertical: "middle" };

        const stockCell = worksheet.getCell(currentRow, 6);
        stockCell.value = `${item.current_stock} ${item.unit}`;
        stockCell.alignment = { horizontal: "right", vertical: "middle" };

        const rowCells = [idCell, nameCell, unitCell, quantityCell, costCell, stockCell];
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

    const totalCostCell = worksheet.getCell(currentRow, 1);
    totalCostCell.value = `Total Cost: Rp ${new Intl.NumberFormat("id-ID").format(totalCost)}`;
    totalCostCell.font = { bold: true, size: 12, color: { argb: "374151" } };
    worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
    totalCostCell.alignment = { horizontal: "right", vertical: "middle" };

    currentRow += 1;

    const itemCountCell = worksheet.getCell(currentRow, 1);
    itemCountCell.value = `Total Items: ${data.length}`;
    itemCountCell.font = { bold: true, size: 12, color: { argb: "374151" } };
    worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
    itemCountCell.alignment = { horizontal: "right", vertical: "middle" };

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, fileName);
};
