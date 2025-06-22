import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import type { InventoryUsageReport } from "../../domain";

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
        width: "12%",
        paddingLeft: 4,
    },
    nameCol: {
        width: "30%",
        paddingLeft: 4,
    },
    unitCol: {
        width: "15%",
    },
    usageCol: {
        width: "14%",
        paddingRight: 4,
    },
    stockCol: {
        width: "29%",
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

    lowStockIndicator: {
        backgroundColor: "#fef2f2",
        borderLeft: 3,
        borderLeftColor: "#ef4444",
        paddingLeft: 4,
    },
    normalStockIndicator: {
        backgroundColor: "#f0fdf4",
        borderLeft: 3,
        borderLeftColor: "#22c55e",
        paddingLeft: 4,
    },
});

const formatNumber = (number: number | string) => {
    const num = typeof number === "string" ? Number.parseFloat(number) : number;
    return new Intl.NumberFormat("id-ID").format(num);
};

export const InventoryUsagePDF = ({
    data,
    dateRange,
}: {
    data: InventoryUsageReport[];
    dateRange: string;
}) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Inventory Usage Report</Text>
                    <Text style={styles.date}>{dateRange}</Text>
                </View>

                <Text style={styles.sectionTitle}>Inventory Items Usage</Text>

                <View style={styles.table}>
                    <View style={styles.tableHeaderRow}>
                        <Text style={[styles.tableColHeader, styles.idCol]}>ID</Text>
                        <Text style={[styles.tableColHeader, styles.nameCol]}>Item Name</Text>
                        <Text style={[styles.tableColHeader, styles.unitCol]}>Unit</Text>
                        <Text style={[styles.tableColHeader, styles.usageCol]}>Usage</Text>
                        <Text style={[styles.tableColHeader, styles.stockCol]}>Current Stock</Text>
                    </View>

                    {data.map((item, _) => {
                        return (
                            <View style={[styles.tableRow]} key={item.id}>
                                <Text style={[styles.tableCol, styles.idCol]}>{item.id}</Text>
                                <Text style={[styles.tableCol, styles.nameCol]}>{item.name}</Text>
                                <Text style={[styles.tableColCenter, styles.unitCol]}>{item.unit}</Text>
                                <Text style={[styles.tableColRight, styles.usageCol]}>
                                    {formatNumber(item.total_quantity_used)} {item.unit}
                                </Text>
                                <Text style={[styles.tableColRight, styles.stockCol]}>
                                    {formatNumber(item.current_stock)} {item.unit}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </Page>
        </Document>
    );
};

export const downloadInventoryPDF = async (
    data: InventoryUsageReport[],
    dateRange: string,
    fileName: string = "inventory-usage-report.pdf",
) => {
    const blob = await pdf(<InventoryUsagePDF data={data} dateRange={dateRange} />).toBlob();

    saveAs(blob, fileName);
};
