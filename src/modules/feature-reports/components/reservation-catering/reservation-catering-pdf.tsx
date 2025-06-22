import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import type { ReservationReport } from "../../domain/reservation";
import { format } from "date-fns";

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

    dateCol: {
        width: "15%",
        paddingLeft: 4,
    },
    packageCountCol: {
        width: "12%",
        textAlign: "center",
    },
    packageListCol: {
        width: "38%",
        paddingLeft: 4,
    },
    cartCol: {
        width: "15%",
        textAlign: "center",
    },
    priceCol: {
        width: "20%",
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

    packageContainer: {
        marginBottom: 2,
    },
});

const formatNumber = (number: number | string) => {
    const num = typeof number === "string" ? Number.parseFloat(number) : number;
    return new Intl.NumberFormat("id-ID").format(num);
};

const formatDate = (date: Date) => {
    return format(new Date(date), "dd-MM-yyyy");
};

export const ReservationCateringPDF = ({
    data,
    dateRange,
}: {
    data: ReservationReport[];
    dateRange: string;
}) => {
    // Calculate total revenue
    const totalRevenue = data.reduce((sum, item) => {
        const price = typeof item.total_price === "string" ? parseFloat(item.total_price) : item.total_price;
        return sum + price;
    }, 0);

    // Calculate total reservations with cart
    const totalWithCart = data.filter((item) => item.is_use_cart).length;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Reservation Catering Report</Text>
                    <Text style={styles.date}>{dateRange}</Text>
                </View>

                <Text style={styles.sectionTitle}>Catering Reservations</Text>

                <View style={styles.table}>
                    <View style={styles.tableHeaderRow}>
                        <Text style={[styles.tableColHeader, styles.dateCol]}>Date</Text>
                        <Text style={[styles.tableColHeader, styles.packageCountCol]}>Total Pkg</Text>
                        <Text style={[styles.tableColHeader, styles.packageListCol]}>Catering Packages</Text>
                        <Text style={[styles.tableColHeader, styles.cartCol]}>Cart</Text>
                        <Text style={[styles.tableColHeader, styles.priceCol]}>Total Price</Text>
                    </View>

                    {data.map((item, index) => {
                        return (
                            <View style={[styles.tableRow]} key={index}>
                                <Text style={[styles.tableCol, styles.dateCol]}>{formatDate(item.event_date)}</Text>
                                <Text style={[styles.tableColCenter, styles.packageCountCol]}>
                                    {item.package_count}
                                </Text>
                                <View style={[styles.tableCol, styles.packageListCol]}>
                                    {item.orderCaterings?.map((pkg, pkgIdx) => (
                                        <View key={pkgIdx} style={styles.packageContainer}>
                                            <Text style={styles.tableCol}>
                                                x{pkg.quantity} {pkg.name}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                                <Text style={[styles.tableColCenter, styles.cartCol]}>
                                    {item.is_use_cart ? "Yes" : "No"}
                                </Text>
                                <Text style={[styles.tableColRight, styles.priceCol]}>
                                    Rp {formatNumber(item.total_price)}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* Summary section */}
                <View style={styles.summary}>
                    <Text style={styles.summaryText}>Total Revenue: Rp {formatNumber(totalRevenue)}</Text>
                    <Text style={styles.summaryDetail}>
                        Total Reservations: {data.length} ({totalWithCart} with cart)
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export const downloadReservationCateringPDF = async (
    data: ReservationReport[],
    dateRange: string,
    fileName: string = "reservation-catering-report.pdf",
) => {
    const blob = await pdf(<ReservationCateringPDF data={data} dateRange={dateRange} />).toBlob();

    saveAs(blob, fileName);
};
