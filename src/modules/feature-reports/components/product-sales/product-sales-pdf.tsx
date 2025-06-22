import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import type { SalesData } from "../../domain";
import { saveAs } from "file-saver";
import { formatCurrency } from "@/lib/utils";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        padding: 30,
        fontFamily: "Helvetica",
    },
    header: {
        marginBottom: 30,
        borderBottom: 2,
        borderBottomColor: "#2563eb",
        paddingBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1e40af",
        marginBottom: 5,
    },
    date: {
        fontSize: 12,
        color: "#6b7280",
        fontStyle: "italic",
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1f2937",
        marginTop: 25,
        marginBottom: 15,
        paddingLeft: 5,
        borderLeft: 4,
        borderLeftColor: "#3b82f6",
        paddingBottom: 2,
    },

    table: {
        display: "flex",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 6,
        overflow: "hidden",
        marginBottom: 20,
    },

    tableHeaderRow: {
        margin: "auto",
        flexDirection: "row",
        backgroundColor: "#f8fafc",
        borderBottomWidth: 2,
        borderBottomColor: "#d1d5db",
        paddingVertical: 12,
        paddingHorizontal: 8,
    },

    tableRow: {
        margin: "auto",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: "#ffffff",
    },

    tableFooterRow: {
        margin: "auto",
        flexDirection: "row",
        backgroundColor: "#eff6ff",
        borderTopWidth: 2,
        borderTopColor: "#3b82f6",
        paddingVertical: 12,
        paddingHorizontal: 8,
        fontWeight: "bold",
    },

    tableColHeader: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#374151",
        textAlign: "left",
        paddingVertical: 2,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    tableCol: {
        fontSize: 10,
        color: "#4b5563",
        textAlign: "left",
        paddingVertical: 2,
    },

    tableColRight: {
        fontSize: 10,
        color: "#4b5563",
        textAlign: "right",
        paddingVertical: 2,
        fontWeight: "medium",
    },

    idCol: {
        width: "10%",
        paddingLeft: 4,
    },
    nameCol: {
        width: "26%",
        paddingLeft: 4,
    },
    quantityCol: {
        width: "11%",
        paddingRight: 4,
    },
    totalCol: {
        width: "18%",
        paddingRight: 4,
        fontWeight: "bold",
    },
    totalCostCol: {
        width: "18%",
        paddingRight: 4,
    },
    grossProfitCol: {
        width: "18%",
        paddingRight: 4,
        fontWeight: "bold",
    },

    grandTotal: {
        marginTop: 30,
        padding: 15,
        backgroundColor: "#f0f9ff",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#0ea5e9",
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
        color: "#0c4a6e",
    },
});

export const SalesReportPDF = ({ data, dateRange }: { data: SalesData; dateRange: string }) => {
    const productSalesTotal = data.productSales.reduce(
        (sum, item) => sum + Number.parseFloat(item.total.toString()),
        0,
    );
    const productGrossProfitTotal = data.productSales.reduce(
        (sum, item) => sum + Number.parseFloat(item.gross_profit.toString()),
        0,
    );
    const addonSalesTotal = data.addonSales.reduce((sum, item) => sum + Number.parseFloat(item.total.toString()), 0);
    const addonGrossProfitTotal = data.addonSales.reduce(
        (sum, item) => sum + Number.parseFloat(item.gross_profit.toString()),
        0,
    );
    const grandTotal = productSalesTotal + addonSalesTotal;
    const grandTotalGrossProfit = productGrossProfitTotal + addonGrossProfitTotal;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Product Sales Report</Text>
                    <Text style={styles.date}>{dateRange}</Text>
                </View>

                <Text style={styles.sectionTitle}>Product Sales</Text>
                <View style={styles.table}>
                    {" "}
                    <View style={styles.tableHeaderRow}>
                        <Text style={[styles.tableColHeader, styles.idCol]}>ID</Text>
                        <Text style={[styles.tableColHeader, styles.nameCol]}>Product Name</Text>
                        <Text style={[styles.tableColHeader, styles.quantityCol]}>Qty</Text>
                        <Text style={[styles.tableColHeader, styles.totalCol]}>Total</Text>
                        <Text style={[styles.tableColHeader, styles.totalCostCol]}>Total Cost</Text>
                        <Text style={[styles.tableColHeader, styles.grossProfitCol]}>Gross Profit</Text>
                    </View>
                    {data.productSales.map((item, _) => (
                        <View style={[styles.tableRow]} key={item.product_id}>
                            <Text style={[styles.tableCol, styles.idCol]}>{item.product_id}</Text>
                            <Text style={[styles.tableCol, styles.nameCol]}>{item.product_name}</Text>
                            <Text style={[styles.tableCol, styles.quantityCol]}>{item.quantity}</Text>
                            <Text style={[styles.tableCol, styles.totalCol]}>{formatCurrency(item.total)}</Text>
                            <Text style={[styles.tableCol, styles.totalCostCol]}>
                                {formatCurrency(item.total_cost)}
                            </Text>
                            <Text style={[styles.tableCol, styles.grossProfitCol]}>
                                {formatCurrency(item.gross_profit)}
                            </Text>
                        </View>
                    ))}
                    <View style={styles.tableFooterRow}>
                        <Text style={[styles.tableColHeader, { width: "47%" }]}>Product Sales Total:</Text>
                        <Text style={[styles.tableColHeader, { width: "36%", textAlign: "left" }]}>
                            {formatCurrency(productSalesTotal)}
                        </Text>
                        <Text style={[styles.tableColHeader, { width: "18%", textAlign: "left" }]}>
                            {formatCurrency(productGrossProfitTotal)}
                        </Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Add-on Sales</Text>
                <View style={styles.table}>
                    {" "}
                    <View style={styles.tableHeaderRow}>
                        <Text style={[styles.tableColHeader, styles.idCol]}>ID</Text>
                        <Text style={[styles.tableColHeader, styles.nameCol]}>Add-on</Text>
                        <Text style={[styles.tableColHeader, styles.quantityCol]}>Qty</Text>
                        <Text style={[styles.tableColHeader, styles.totalCol]}>Total</Text>
                        <Text style={[styles.tableColHeader, styles.totalCostCol]}>Total Cost</Text>
                        <Text style={[styles.tableColHeader, styles.grossProfitCol]}>Gross Profit</Text>
                    </View>
                    {data.addonSales.map((item) => (
                        <View style={styles.tableRow} key={item.addon_id}>
                            <Text style={[styles.tableCol, styles.idCol]}>{item.addon_id}</Text>
                            <Text style={[styles.tableCol, styles.nameCol]}>{item.addon_name}</Text>
                            <Text style={[styles.tableCol, styles.quantityCol]}>{item.quantity}</Text>
                            <Text style={[styles.tableCol, styles.totalCol]}>{formatCurrency(item.total)}</Text>
                            <Text style={[styles.tableCol, styles.totalCostCol]}>
                                {formatCurrency(item.total_cost)}
                            </Text>
                            <Text style={[styles.tableCol, styles.grossProfitCol]}>
                                {formatCurrency(item.gross_profit)}
                            </Text>
                        </View>
                    ))}
                    <View style={styles.tableFooterRow}>
                        <Text style={[styles.tableColHeader, { width: "47%" }]}>Add-on Sales Total:</Text>
                        <Text style={[styles.tableColHeader, { width: "36%", textAlign: "left" }]}>
                            {formatCurrency(addonSalesTotal)}
                        </Text>
                        <Text style={[styles.tableColHeader, { width: "18%", textAlign: "left" }]}>
                            {formatCurrency(addonGrossProfitTotal)}
                        </Text>
                    </View>
                </View>

                <View style={styles.grandTotal}>
                    <Text>Grand Total (All Sales): {formatCurrency(grandTotal)}</Text>
                    <Text style={{ marginTop: 8 }}>
                        Grand Total (Gross Profit): {formatCurrency(grandTotalGrossProfit)}
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export const downloadPDF = async (data: SalesData, dateRange: string, fileName: string = "sales-report.pdf") => {
    try {
        const blob = await pdf(<SalesReportPDF data={data} dateRange={dateRange} />).toBlob();
        saveAs(blob, fileName);
    } catch (error) {
        console.error("Error downloading PDF:", error);
    }
};
