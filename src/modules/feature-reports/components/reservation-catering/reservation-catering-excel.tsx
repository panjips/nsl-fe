import ExcelJS from "exceljs";
import type { ReservationReport } from "../../domain/reservation";
import { saveAs } from "file-saver";
import { format } from "date-fns";

export const generateReservationCateringExcel = async (
    data: ReservationReport[],
    dateRange: string,
    fileName: string = `Reservation_Catering_Report_${dateRange.replace(/\s+/g, "_")}.xlsx`,
): Promise<void> => {
    const workbook = new ExcelJS.Workbook();

    workbook.creator = "NSL Reservation Report";
    workbook.lastModifiedBy = "NSL Reporting System";
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.addWorksheet("Reservation Catering Report", {
        pageSetup: {
            paperSize: 9,
            orientation: "landscape", // Using landscape for better display of packages
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
        { width: 15 }, // Date
        { width: 12 }, // Package Count
        { width: 40 }, // Catering Packages
        { width: 12 }, // Using Cart
        { width: 15 }, // Total Price
    ];

    let currentRow = 1;

    const titleCell = worksheet.getCell("A1");
    titleCell.value = "RESERVATION CATERING REPORT";
    titleCell.font = { size: 20, bold: true, color: { argb: "1e40af" } };
    titleCell.alignment = { horizontal: "center", vertical: "middle" };
    worksheet.mergeCells("A1:E1");

    const dateCell = worksheet.getCell("A2");
    dateCell.value = dateRange;
    dateCell.font = { size: 12, italic: true, color: { argb: "6b7280" } };
    dateCell.alignment = { horizontal: "center" };
    worksheet.mergeCells("A2:E2");

    currentRow = 4;

    const reservationTitleCell = worksheet.getCell(`A${currentRow}`);
    reservationTitleCell.value = "CATERING RESERVATIONS";
    reservationTitleCell.font = { size: 14, bold: true, color: { argb: "1f2937" } };
    reservationTitleCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f8fafc" },
    };
    reservationTitleCell.border = {
        left: { style: "thick", color: { argb: "3b82f6" } },
        top: { style: "thin", color: { argb: "e5e7eb" } },
        bottom: { style: "thin", color: { argb: "e5e7eb" } },
        right: { style: "thin", color: { argb: "e5e7eb" } },
    };
    worksheet.mergeCells(`A${currentRow}:E${currentRow}`);
    currentRow++;

    const headers = ["Date", "Total Package", "Catering Packages", "Using Cart", "Total Price"];
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

    let totalRevenue = 0;
    let totalWithCart = 0;

    data.forEach((item, index) => {
        const isEvenRow = index % 2 === 0;

        // Calculate totals for summary
        const price = typeof item.total_price === "string" ? parseFloat(item.total_price) : item.total_price;
        totalRevenue += price;
        if (item.is_use_cart) totalWithCart++;

        const dateCell = worksheet.getCell(currentRow, 1);
        dateCell.value = format(new Date(item.event_date), "dd-MM-yyyy");
        dateCell.alignment = { horizontal: "center", vertical: "middle" };

        const packageCountCell = worksheet.getCell(currentRow, 2);
        packageCountCell.value = item.package_count;
        packageCountCell.alignment = { horizontal: "center", vertical: "middle" };

        const packagesCell = worksheet.getCell(currentRow, 3);
        // Create a formatted string of packages
        const packagesText = item.orderCaterings?.map((pkg) => `x${pkg.quantity} ${pkg.name}`).join("\n");
        packagesCell.value = packagesText;
        packagesCell.alignment = { horizontal: "left", vertical: "middle" };
        packagesCell.alignment.wrapText = true;

        const cartCell = worksheet.getCell(currentRow, 4);
        cartCell.value = item.is_use_cart ? "Yes" : "No";
        cartCell.alignment = { horizontal: "center", vertical: "middle" };
        // Add color indicator
        if (item.is_use_cart) {
            cartCell.font = { color: { argb: "008000" } }; // Green for Yes
        } else {
            cartCell.font = { color: { argb: "FF0000" } }; // Red for No
        }

        const priceCell = worksheet.getCell(currentRow, 5);
        priceCell.value = price;
        priceCell.numFmt = '"Rp "#,##0';
        priceCell.alignment = { horizontal: "right", vertical: "middle" };

        const rowCells = [dateCell, packageCountCell, packagesCell, cartCell, priceCell];
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

        // Set row height to fit content
        worksheet.getRow(currentRow).height = 25;

        currentRow++;
    });

    currentRow += 1;

    // Summary section
    const summarySection = worksheet.getCell(`A${currentRow}`);
    summarySection.value = "SUMMARY";
    summarySection.font = { size: 12, bold: true, color: { argb: "0c4a6e" } };
    summarySection.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f0f9ff" },
    };
    worksheet.mergeCells(`A${currentRow}:E${currentRow}`);
    summarySection.alignment = { horizontal: "center", vertical: "middle" };
    currentRow++;

    const totalRevenueCell = worksheet.getCell(`A${currentRow}`);
    totalRevenueCell.value = "Total Revenue:";
    totalRevenueCell.font = { bold: true };
    worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
    totalRevenueCell.alignment = { horizontal: "right", vertical: "middle" };

    const totalRevenueValueCell = worksheet.getCell(`D${currentRow}`);
    totalRevenueValueCell.value = totalRevenue;
    totalRevenueValueCell.numFmt = '"Rp "#,##0';
    totalRevenueValueCell.font = { bold: true };
    worksheet.mergeCells(`D${currentRow}:E${currentRow}`);
    totalRevenueValueCell.alignment = { horizontal: "right", vertical: "middle" };
    currentRow++;

    const totalResCell = worksheet.getCell(`A${currentRow}`);
    totalResCell.value = `Total Reservations: ${data.length} (${totalWithCart} with cart)`;
    totalResCell.font = { italic: true, color: { argb: "0369a1" } };
    worksheet.mergeCells(`A${currentRow}:E${currentRow}`);
    totalResCell.alignment = { horizontal: "right", vertical: "middle" };

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, fileName);
};
