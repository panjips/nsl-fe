import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import type { RevenueReport } from "../../domain/revenue";

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

    totalRow: {
        margin: "auto",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: "#f0f9ff",
    },

    tableColHeader: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#374151",
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

    nameCol: {
        width: "40%",
        paddingLeft: 4,
    },
    amountCol: {
        width: "30%",
        paddingLeft: 4,
    },
    totalCol: {
        width: "30%",
        paddingRight: 4,
    },

    totalFont: {
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

export const RevenuePDF = ({
    data,
    dateRange,
}: {
    data: RevenueReport;
    dateRange: string;
}) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Revenue Report</Text>
                    <Text style={styles.date}>{dateRange}</Text>
                </View>

                <Text style={styles.sectionTitle}>Revenue Details</Text>

                <View style={styles.table}>
                    <View style={styles.tableHeaderRow}>
                        <Text style={[styles.tableColHeader, styles.nameCol]}>Name</Text>
                        <Text style={[styles.tableColHeader, styles.amountCol]}>Amount</Text>
                        <Text style={[styles.tableColHeader, styles.totalCol, styles.tableColRight]}>Total</Text>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCol, styles.nameCol]}>Orders (Product + Addon)</Text>
                        <Text style={[styles.tableCol, styles.amountCol]}>{data.orders.count}</Text>
                        <Text style={[styles.tableColRight, styles.totalCol]}>
                            Rp {formatNumber(data.orders.total)}
                        </Text>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCol, styles.nameCol]}>Reservations</Text>
                        <Text style={[styles.tableCol, styles.amountCol]}>{data.reservations.count}</Text>
                        <Text style={[styles.tableColRight, styles.totalCol]}>
                            Rp {formatNumber(data.reservations.total)}
                        </Text>
                    </View>

                    <View style={styles.totalRow}>
                        <Text style={[styles.tableCol, styles.nameCol, styles.totalFont]}>Total Revenue</Text>
                        <Text style={[styles.tableCol, styles.amountCol]} />
                        <Text style={[styles.tableColRight, styles.totalCol, styles.totalFont]}>
                            Rp {formatNumber(data.totalRevenue)}
                        </Text>
                    </View>
                </View>

                <View style={styles.summary}>
                    <Text style={styles.summaryText}>Total Revenue: Rp {formatNumber(data.totalRevenue)}</Text>
                    <Text style={styles.summaryDetail}>
                        Order Transactions: {data.orders.count} | Reservations: {data.reservations.count}
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export const downloadRevenuePDF = async (
    data: RevenueReport,
    dateRange: string,
    fileName: string = "revenue-report.pdf",
) => {
    const blob = await pdf(<RevenuePDF data={data} dateRange={dateRange} />).toBlob();

    saveAs(blob, fileName);
};
