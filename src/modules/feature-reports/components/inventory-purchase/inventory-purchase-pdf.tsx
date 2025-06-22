import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import type { InventoryPurchaseReport } from "../../domain";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        padding: 30,
        fontFamily: "Helvetica",
    },
    header: {
        marginBottom: 5,
        borderBottom: 2,
        borderBottomColor: "#2563eb",
        paddingBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1e40af",
        marginBottom: 5,
        textAlign: "center",
    },
    date: {
        fontSize: 12,
        color: "#6b7280",
        fontStyle: "italic",
        textAlign: "center",
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

    tableColHeader: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#374151",
        textAlign: "center",
        paddingVertical: 2,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    tableCol: {
        fontSize: 10,
        color: "#4b5563",
        textAlign: "left",
        paddingVertical: 1,
    },

    tableColRight: {
        fontSize: 10,
        color: "#4b5563",
        textAlign: "right",
        paddingVertical: 1,
        fontWeight: "medium",
    },

    tableColCenter: {
        fontSize: 10,
        color: "#4b5563",
        textAlign: "center",
        paddingVertical: 1,
    },

    idCol: {
        width: "8%",
        paddingLeft: 4,
    },
    nameCol: {
        width: "20%",
        paddingLeft: 4,
    },
    unitCol: {
        width: "10%",
    },
    qtyCol: {
        width: "15%",
        paddingRight: 4,
    },
    costCol: {
        width: "20%",
        paddingRight: 4,
    },
    stockCol: {
        width: "27%",
        paddingRight: 4,
        fontWeight: "bold",
    },

    summary: {
        marginTop: 20,
        padding: 15,
        backgroundColor: "#f0f9ff",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#0ea5e9",
        textAlign: "center",
    },
    summaryText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#0c4a6e",
        marginBottom: 5,
    },
    summaryDetail: {
        fontSize: 12,
        color: "#0369a1",
    },
});

const formatNumber = (number: number | string) => {
    const num = typeof number === "string" ? Number.parseFloat(number) : number;
    return new Intl.NumberFormat("id-ID").format(num);
};

export const InventoryPurchasePDF = ({
    data,
    dateRange,
}: {
    data: InventoryPurchaseReport[];
    dateRange: string;
}) => {
    // Calculate total cost
    const totalCost = data.reduce((sum, item) => sum + item.total_cost, 0);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Inventory Purchase Report</Text>
                    <Text style={styles.date}>{dateRange}</Text>
                </View>

                <Text style={styles.sectionTitle}>Inventory Items Purchase</Text>

                <View style={styles.table}>
                    <View style={styles.tableHeaderRow}>
                        <Text style={[styles.tableColHeader, styles.idCol]}>ID</Text>
                        <Text style={[styles.tableColHeader, styles.nameCol]}>Item Name</Text>
                        <Text style={[styles.tableColHeader, styles.unitCol]}>Unit</Text>
                        <Text style={[styles.tableColHeader, styles.qtyCol]}>Quantity</Text>
                        <Text style={[styles.tableColHeader, styles.costCol]}>Total Cost</Text>
                        <Text style={[styles.tableColHeader, styles.stockCol]}>Current Stock</Text>
                    </View>

                    {data.map((item) => {
                        return (
                            <View style={[styles.tableRow]} key={item.id}>
                                <Text style={[styles.tableCol, styles.idCol]}>{item.id}</Text>
                                <Text style={[styles.tableCol, styles.nameCol]}>{item.name}</Text>
                                <Text style={[styles.tableColCenter, styles.unitCol]}>{item.unit}</Text>
                                <Text style={[styles.tableColRight, styles.qtyCol]}>
                                    {formatNumber(item.total_quantity_purchased)} {item.unit}
                                </Text>
                                <Text style={[styles.tableColRight, styles.costCol]}>
                                    Rp {formatNumber(item.total_cost)}
                                </Text>
                                <Text style={[styles.tableColRight, styles.stockCol]}>
                                    {formatNumber(item.current_stock)} {item.unit}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* Summary section with total cost */}
                <View style={styles.summary}>
                    <Text style={styles.summaryText}>Total Purchase Cost: Rp {formatNumber(totalCost)}</Text>
                    <Text style={styles.summaryDetail}>Total Items: {data.length}</Text>
                </View>
            </Page>
        </Document>
    );
};

export const downloadInventoryPDF = async (
    data: InventoryPurchaseReport[],
    dateRange: string,
    fileName: string = "inventory-purchase-report.pdf",
) => {
    const blob = await pdf(<InventoryPurchasePDF data={data} dateRange={dateRange} />).toBlob();

    saveAs(blob, fileName);
};
