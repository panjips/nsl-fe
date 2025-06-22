import ExcelJS from "exceljs";
import type { RevenueReport } from "../../domain/revenue";
import { saveAs } from "file-saver";

export const generateRevenueExcel = async (
    data: RevenueReport,
    dateRange: string,
    fileName: string = `Revenue_Report_${dateRange.replace(/\s+/g, "_")}.xlsx`,
): Promise<void> => {
    const workbook = new ExcelJS.Workbook();

    workbook.creator = "NSL Revenue Report";
    workbook.lastModifiedBy = "NSL Reporting System";
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.addWorksheet("Revenue Report", {
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

    // Set column widths
    worksheet.columns = [
        { width: 30 }, // Name
        { width: 20 }, // Amount
        { width: 20 }, // Total
    ];

    let currentRow = 1;

    // Add title
    const titleCell = worksheet.getCell("A1");
    titleCell.value = "REVENUE REPORT";
    titleCell.font = { size: 20, bold: true, color: { argb: "1e40af" } };
    titleCell.alignment = { horizontal: "center", vertical: "middle" };
    worksheet.mergeCells("A1:C1");

    // Add date range
    const dateCell = worksheet.getCell("A2");
    dateCell.value = dateRange;
    dateCell.font = { size: 12, italic: true, color: { argb: "6b7280" } };
    dateCell.alignment = { horizontal: "center" };
    worksheet.mergeCells("A2:C2");

    currentRow = 4;

    // Add revenue title
    const revenueTitleCell = worksheet.getCell(`A${currentRow}`);
    revenueTitleCell.value = "REVENUE DETAILS";
    revenueTitleCell.font = { size: 14, bold: true, color: { argb: "1f2937" } };
    revenueTitleCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f8fafc" },
    };
    revenueTitleCell.border = {
        left: { style: "thick", color: { argb: "3b82f6" } },
        top: { style: "thin", color: { argb: "e5e7eb" } },
        bottom: { style: "thin", color: { argb: "e5e7eb" } },
        right: { style: "thin", color: { argb: "e5e7eb" } },
    };
    worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
    currentRow++;

    // Add headers
    const headers = ["Name", "Amount", "Total"];
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

    // Add orders row
    const ordersNameCell = worksheet.getCell(currentRow, 1);
    ordersNameCell.value = "Orders (Product + Addon)";
    ordersNameCell.alignment = { horizontal: "left", vertical: "middle" };

    const ordersAmountCell = worksheet.getCell(currentRow, 2);
    ordersAmountCell.value = data.orders.count;
    ordersAmountCell.alignment = { horizontal: "center", vertical: "middle" };

    const ordersTotalCell = worksheet.getCell(currentRow, 3);
    ordersTotalCell.value = data.orders.total;
    ordersTotalCell.numFmt = '"Rp "#,##0';
    ordersTotalCell.alignment = { horizontal: "right", vertical: "middle" };

    // Apply styling
    [ordersNameCell, ordersAmountCell, ordersTotalCell].forEach((cell) => {
        cell.border = {
            top: { style: "thin", color: { argb: "f3f4f6" } },
            bottom: { style: "thin", color: { argb: "f3f4f6" } },
            left: { style: "thin", color: { argb: "e5e7eb" } },
            right: { style: "thin", color: { argb: "e5e7eb" } },
        };
    });
    currentRow++;

    // Add reservations row
    const reservationsNameCell = worksheet.getCell(currentRow, 1);
    reservationsNameCell.value = "Reservations";
    reservationsNameCell.alignment = { horizontal: "left", vertical: "middle" };

    const reservationsAmountCell = worksheet.getCell(currentRow, 2);
    reservationsAmountCell.value = data.reservations.count;
    reservationsAmountCell.alignment = { horizontal: "center", vertical: "middle" };

    const reservationsTotalCell = worksheet.getCell(currentRow, 3);
    reservationsTotalCell.value = data.reservations.total;
    reservationsTotalCell.numFmt = '"Rp "#,##0';
    reservationsTotalCell.alignment = { horizontal: "right", vertical: "middle" };

    // Apply styling
    [reservationsNameCell, reservationsAmountCell, reservationsTotalCell].forEach((cell) => {
        cell.border = {
            top: { style: "thin", color: { argb: "f3f4f6" } },
            bottom: { style: "thin", color: { argb: "f3f4f6" } },
            left: { style: "thin", color: { argb: "e5e7eb" } },
            right: { style: "thin", color: { argb: "e5e7eb" } },
        };
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "f9fafb" },
        };
    });
    currentRow++;

    // Add total row with highlight
    const totalNameCell = worksheet.getCell(currentRow, 1);
    totalNameCell.value = "Total Revenue";
    totalNameCell.font = { bold: true };
    totalNameCell.alignment = { horizontal: "left", vertical: "middle" };

    const totalAmountCell = worksheet.getCell(currentRow, 2);
    totalAmountCell.alignment = { horizontal: "center", vertical: "middle" };

    const totalValueCell = worksheet.getCell(currentRow, 3);
    totalValueCell.value = data.totalRevenue;
    totalValueCell.numFmt = '"Rp "#,##0';
    totalValueCell.font = { bold: true };
    totalValueCell.alignment = { horizontal: "right", vertical: "middle" };

    // Apply styling to total row
    [totalNameCell, totalAmountCell, totalValueCell].forEach((cell) => {
        cell.border = {
            top: { style: "thin", color: { argb: "f3f4f6" } },
            bottom: { style: "thin", color: { argb: "f3f4f6" } },
            left: { style: "thin", color: { argb: "e5e7eb" } },
            right: { style: "thin", color: { argb: "e5e7eb" } },
        };
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "e5f6fd" }, // Light blue highlight for total row
        };
    });
    currentRow += 2;

    // Add summary section
    const summarySection = worksheet.getCell(`A${currentRow}`);
    summarySection.value = "SUMMARY";
    summarySection.font = { size: 12, bold: true, color: { argb: "0c4a6e" } };
    summarySection.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f0f9ff" },
    };
    worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
    summarySection.alignment = { horizontal: "center", vertical: "middle" };
    currentRow++;

    // Add transactions count
    const transactionsCell = worksheet.getCell(`A${currentRow}`);
    transactionsCell.value = `Order Transactions: ${data.orders.count} | Reservations: ${data.reservations.count}`;
    transactionsCell.font = { italic: true, color: { argb: "0369a1" } };
    worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
    transactionsCell.alignment = { horizontal: "center", vertical: "middle" };

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, fileName);
};
