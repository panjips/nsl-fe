import ExcelJS from "exceljs";
import type { SalesData } from "../../domain";
import { saveAs } from "file-saver";

export const generateSalesExcel = async (
    data: SalesData,
    dateRange: string,
    fileName: string = `Sales_Report_${dateRange.replace(/\s+/g, "_")}.xlsx`,
): Promise<void> => {
    const workbook = new ExcelJS.Workbook();

    workbook.creator = "NSL Sales Report";
    workbook.lastModifiedBy = "NSL Sales Report System";
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.addWorksheet("Sales Report", {
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
        { width: 8 }, // ID
        { width: 30 }, // Name
        { width: 8 }, // Quantity
        { width: 12 }, // Price
        { width: 12 }, // Cost
        { width: 12 }, // Total
        { width: 12 }, // Total Cost
        { width: 12 }, // Gross Profit
    ];

    let currentRow = 1;

    const titleCell = worksheet.getCell("A1");
    titleCell.value = "SALES REPORT";
    titleCell.font = { size: 20, bold: true, color: { argb: "1e40af" } };
    titleCell.alignment = { horizontal: "center", vertical: "middle" };
    worksheet.mergeCells("A1:H1");

    const dateCell = worksheet.getCell("A2");
    dateCell.value = dateRange;
    dateCell.font = { size: 12, italic: true, color: { argb: "6b7280" } };
    dateCell.alignment = { horizontal: "center" };
    worksheet.mergeCells("A2:H2");

    currentRow = 4;

    const productTitleCell = worksheet.getCell(`A${currentRow}`);
    productTitleCell.value = "PRODUCT SALES";
    productTitleCell.font = { size: 14, bold: true, color: { argb: "1f2937" } };
    productTitleCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f8fafc" },
    };
    productTitleCell.border = {
        left: { style: "thick", color: { argb: "3b82f6" } },
        top: { style: "thin", color: { argb: "e5e7eb" } },
        bottom: { style: "thin", color: { argb: "e5e7eb" } },
        right: { style: "thin", color: { argb: "e5e7eb" } },
    };
    worksheet.mergeCells(`A${currentRow}:H${currentRow}`);
    currentRow++;

    const productHeaders = ["ID", "Product Name", "Qty", "Unit Price", "Cost", "Total", "Total Cost", "Gross Profit"];
    productHeaders.forEach((header, index) => {
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

    let productSalesTotal = 0;
    let productGrossProfitTotal = 0;

    data.productSales.forEach((item, index) => {
        const isEvenRow = index % 2 === 0;
        const itemTotal = typeof item.total === "string" ? parseFloat(item.total) : item.total;
        const itemPrice = typeof item.price === "string" ? parseFloat(item.price) : item.price;
        const itemCost = typeof item.cost === "string" ? parseFloat(item.cost) : item.cost;
        const itemTotalCost = typeof item.total_cost === "string" ? parseFloat(item.total_cost) : item.total_cost;
        const itemGrossProfit =
            typeof item.gross_profit === "string" ? parseFloat(item.gross_profit) : item.gross_profit;

        const idCell = worksheet.getCell(currentRow, 1);
        idCell.value = item.product_id;
        idCell.alignment = { horizontal: "left", vertical: "middle" };

        const nameCell = worksheet.getCell(currentRow, 2);
        nameCell.value = item.product_name;
        nameCell.alignment = { horizontal: "left", vertical: "middle" };

        const qtyCell = worksheet.getCell(currentRow, 3);
        qtyCell.value = item.quantity;
        qtyCell.alignment = { horizontal: "center", vertical: "middle" };

        const priceCell = worksheet.getCell(currentRow, 4);
        priceCell.value = itemPrice;
        priceCell.numFmt = "#,##0";
        priceCell.alignment = { horizontal: "right", vertical: "middle" };

        const costCell = worksheet.getCell(currentRow, 5);
        costCell.value = itemCost;
        costCell.numFmt = "#,##0";
        costCell.alignment = { horizontal: "right", vertical: "middle" };

        const totalCell = worksheet.getCell(currentRow, 6);
        totalCell.value = itemTotal;
        totalCell.numFmt = "#,##0";
        totalCell.alignment = { horizontal: "right", vertical: "middle" };
        totalCell.font = { bold: true };

        const totalCostCell = worksheet.getCell(currentRow, 7);
        totalCostCell.value = itemTotalCost;
        totalCostCell.numFmt = "#,##0";
        totalCostCell.alignment = { horizontal: "right", vertical: "middle" };

        const grossProfitCell = worksheet.getCell(currentRow, 8);
        grossProfitCell.value = itemGrossProfit;
        grossProfitCell.numFmt = "#,##0";
        grossProfitCell.alignment = { horizontal: "right", vertical: "middle" };
        grossProfitCell.font = { bold: true };

        const rowCells = [idCell, nameCell, qtyCell, priceCell, costCell, totalCell, totalCostCell, grossProfitCell];
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

        productSalesTotal += itemTotal;
        productGrossProfitTotal += itemGrossProfit;
        currentRow++;
    });

    const productTotalLabelCell = worksheet.getCell(currentRow, 1);
    productTotalLabelCell.value = "PRODUCT SALES TOTAL:";
    productTotalLabelCell.font = { bold: true, color: { argb: "374151" } };
    productTotalLabelCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "eff6ff" },
    };
    worksheet.mergeCells(`A${currentRow}:E${currentRow}`);

    const productTotalValueCell = worksheet.getCell(currentRow, 6);
    productTotalValueCell.value = productSalesTotal;
    productTotalValueCell.numFmt = "#,##0";
    productTotalValueCell.font = { bold: true, color: { argb: "374151" } };
    productTotalValueCell.alignment = { horizontal: "right", vertical: "middle" };
    productTotalValueCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "eff6ff" },
    };

    // Add an empty cell for Total Cost column for consistency in formatting
    const productEmptyTotalCostCell = worksheet.getCell(currentRow, 7);
    productEmptyTotalCostCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "eff6ff" },
    };

    // Add the gross profit total
    const productGrossProfitTotalCell = worksheet.getCell(currentRow, 8);
    productGrossProfitTotalCell.value = productGrossProfitTotal;
    productGrossProfitTotalCell.numFmt = "#,##0";
    productGrossProfitTotalCell.font = { bold: true, color: { argb: "374151" } };
    productGrossProfitTotalCell.alignment = { horizontal: "right", vertical: "middle" };
    productGrossProfitTotalCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "eff6ff" },
    };

    const totalRowCells = [
        productTotalLabelCell,
        productTotalValueCell,
        productEmptyTotalCostCell,
        productGrossProfitTotalCell,
    ];
    totalRowCells.forEach((cell) => {
        cell.border = {
            top: { style: "medium", color: { argb: "3b82f6" } },
            bottom: { style: "medium", color: { argb: "3b82f6" } },
            left: { style: "thin", color: { argb: "3b82f6" } },
            right: { style: "thin", color: { argb: "3b82f6" } },
        };
    });

    currentRow += 3;

    const addonTitleCell = worksheet.getCell(`A${currentRow}`);
    addonTitleCell.value = "ADD-ON SALES";
    addonTitleCell.font = { size: 14, bold: true, color: { argb: "1f2937" } };
    addonTitleCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f8fafc" },
    };
    addonTitleCell.border = {
        left: { style: "thick", color: { argb: "3b82f6" } },
        top: { style: "thin", color: { argb: "e5e7eb" } },
        bottom: { style: "thin", color: { argb: "e5e7eb" } },
        right: { style: "thin", color: { argb: "e5e7eb" } },
    };
    worksheet.mergeCells(`A${currentRow}:H${currentRow}`);
    currentRow++;

    const addonHeaders = ["ID", "Add-on Name", "Qty", "Unit Price", "Cost", "Total", "Total Cost", "Gross Profit"];
    addonHeaders.forEach((header, index) => {
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

    let addonSalesTotal = 0;
    let addonGrossProfitTotal = 0;
    data.addonSales.forEach((item, index) => {
        const isEvenRow = index % 2 === 0;
        const itemTotal = typeof item.total === "string" ? parseFloat(item.total) : item.total;
        const itemPrice = typeof item.price === "string" ? parseFloat(item.price) : item.price;
        const itemCost = typeof item.cost === "string" ? parseFloat(item.cost) : item.cost;
        const itemTotalCost = typeof item.total_cost === "string" ? parseFloat(item.total_cost) : item.total_cost;
        const itemGrossProfit =
            typeof item.gross_profit === "string" ? parseFloat(item.gross_profit) : item.gross_profit;

        const idCell = worksheet.getCell(currentRow, 1);
        idCell.value = item.addon_id;
        idCell.alignment = { horizontal: "left", vertical: "middle" };

        const nameCell = worksheet.getCell(currentRow, 2);
        nameCell.value = item.addon_name;
        nameCell.alignment = { horizontal: "left", vertical: "middle" };

        const qtyCell = worksheet.getCell(currentRow, 3);
        qtyCell.value = item.quantity;
        qtyCell.alignment = { horizontal: "center", vertical: "middle" };

        const priceCell = worksheet.getCell(currentRow, 4);
        priceCell.value = itemPrice;
        priceCell.numFmt = "#,##0";
        priceCell.alignment = { horizontal: "right", vertical: "middle" };

        const costCell = worksheet.getCell(currentRow, 5);
        costCell.value = itemCost;
        costCell.numFmt = "#,##0";
        costCell.alignment = { horizontal: "right", vertical: "middle" };

        const totalCell = worksheet.getCell(currentRow, 6);
        totalCell.value = itemTotal;
        totalCell.numFmt = "#,##0";
        totalCell.alignment = { horizontal: "right", vertical: "middle" };
        totalCell.font = { bold: true };

        const totalCostCell = worksheet.getCell(currentRow, 7);
        totalCostCell.value = itemTotalCost;
        totalCostCell.numFmt = "#,##0";
        totalCostCell.alignment = { horizontal: "right", vertical: "middle" };

        const grossProfitCell = worksheet.getCell(currentRow, 8);
        grossProfitCell.value = itemGrossProfit;
        grossProfitCell.numFmt = "#,##0";
        grossProfitCell.alignment = { horizontal: "right", vertical: "middle" };
        grossProfitCell.font = { bold: true };

        const rowCells = [idCell, nameCell, qtyCell, priceCell, costCell, totalCell, totalCostCell, grossProfitCell];
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

        addonSalesTotal += itemTotal;
        addonGrossProfitTotal += itemGrossProfit;
        currentRow++;
    });

    const addonTotalLabelCell = worksheet.getCell(currentRow, 1);
    addonTotalLabelCell.value = "ADD-ON SALES TOTAL:";
    addonTotalLabelCell.font = { bold: true, color: { argb: "374151" } };
    addonTotalLabelCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "eff6ff" },
    };
    worksheet.mergeCells(`A${currentRow}:E${currentRow}`);

    const addonTotalValueCell = worksheet.getCell(currentRow, 6);
    addonTotalValueCell.value = addonSalesTotal;
    addonTotalValueCell.numFmt = "#,##0";
    addonTotalValueCell.font = { bold: true, color: { argb: "374151" } };
    addonTotalValueCell.alignment = { horizontal: "right", vertical: "middle" };
    addonTotalValueCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "eff6ff" },
    };

    // Add an empty cell for Total Cost column for consistency in formatting
    const addonEmptyTotalCostCell = worksheet.getCell(currentRow, 7);
    addonEmptyTotalCostCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "eff6ff" },
    };

    // Add the gross profit total
    const addonGrossProfitTotalCell = worksheet.getCell(currentRow, 8);
    addonGrossProfitTotalCell.value = addonGrossProfitTotal;
    addonGrossProfitTotalCell.numFmt = "#,##0";
    addonGrossProfitTotalCell.font = { bold: true, color: { argb: "374151" } };
    addonGrossProfitTotalCell.alignment = { horizontal: "right", vertical: "middle" };
    addonGrossProfitTotalCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "eff6ff" },
    };

    const addonTotalRowCells = [
        addonTotalLabelCell,
        addonTotalValueCell,
        addonEmptyTotalCostCell,
        addonGrossProfitTotalCell,
    ];
    addonTotalRowCells.forEach((cell) => {
        cell.border = {
            top: { style: "medium", color: { argb: "3b82f6" } },
            bottom: { style: "medium", color: { argb: "3b82f6" } },
            left: { style: "thin", color: { argb: "3b82f6" } },
            right: { style: "thin", color: { argb: "3b82f6" } },
        };
    });

    currentRow += 2;

    const grandTotal = productSalesTotal + addonSalesTotal;
    const grandTotalGrossProfit = productGrossProfitTotal + addonGrossProfitTotal;
    const grandTotalLabelCell = worksheet.getCell(currentRow, 1);
    grandTotalLabelCell.value = "GRAND TOTAL (ALL SALES):";
    grandTotalLabelCell.font = { size: 14, bold: true, color: { argb: "0c4a6e" } };
    grandTotalLabelCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f0f9ff" },
    };
    worksheet.mergeCells(`A${currentRow}:E${currentRow}`);

    const grandTotalValueCell = worksheet.getCell(currentRow, 6);
    grandTotalValueCell.value = grandTotal;
    grandTotalValueCell.numFmt = "#,##0";
    grandTotalValueCell.font = { size: 14, bold: true, color: { argb: "0c4a6e" } };
    grandTotalValueCell.alignment = { horizontal: "right", vertical: "middle" };
    grandTotalValueCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f0f9ff" },
    };

    // Add empty cell for Total Cost column for consistency in formatting
    const grandEmptyTotalCostCell = worksheet.getCell(currentRow, 7);
    grandEmptyTotalCostCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f0f9ff" },
    };

    // Add the gross profit grand total
    const grandGrossProfitTotalCell = worksheet.getCell(currentRow, 8);
    grandGrossProfitTotalCell.value = grandTotalGrossProfit;
    grandGrossProfitTotalCell.numFmt = "#,##0";
    grandGrossProfitTotalCell.font = { size: 14, bold: true, color: { argb: "0c4a6e" } };
    grandGrossProfitTotalCell.alignment = { horizontal: "right", vertical: "middle" };
    grandGrossProfitTotalCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f0f9ff" },
    };

    const grandTotalCells = [
        grandTotalLabelCell,
        grandTotalValueCell,
        grandEmptyTotalCostCell,
        grandGrossProfitTotalCell,
    ];
    grandTotalCells.forEach((cell) => {
        cell.border = {
            top: { style: "thick", color: { argb: "0ea5e9" } },
            bottom: { style: "thick", color: { argb: "0ea5e9" } },
            left: { style: "medium", color: { argb: "0ea5e9" } },
            right: { style: "medium", color: { argb: "0ea5e9" } },
        };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, fileName);
};
