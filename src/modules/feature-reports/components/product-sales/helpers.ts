import type { DateRange, ReportType } from "../../domain";

export const getDateRange = (reportType: ReportType, date: Date): DateRange => {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    let label: string = "";

    switch (reportType) {
        case "DAILY":
            label = startDate.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
            break;
        case "WEEKLY": {
            const day = startDate.getDay();
            const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
            startDate.setDate(diff);
            startDate.setHours(0, 0, 0, 0);

            const endOfWeek = new Date(startDate);
            endOfWeek.setDate(startDate.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);
            endDate.setTime(endOfWeek.getTime());

            const startFormatted = startDate.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
            });
            const endFormatted = endDate.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
            label = `${startFormatted} - ${endFormatted}`;
            break;
        }
        case "MONTHLY": {
            startDate.setDate(1);
            startDate.setHours(0, 0, 0, 0);

            endDate.setMonth(endDate.getMonth() + 1, 0);
            endDate.setHours(23, 59, 59, 999);

            label = startDate.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
            break;
        }
        case "YEARLY": {
            startDate.setMonth(0, 1);
            startDate.setHours(0, 0, 0, 0);

            endDate.setMonth(11, 31);
            endDate.setHours(23, 59, 59, 999);

            label = startDate.getFullYear().toString();
            break;
        }
        default:
            label = "Custom Range";
    }

    return {
        start: startDate,
        end: endDate,
        label,
    };
};

export const calculateTotal = (items: Array<{ total: string }>): number => {
    return items.reduce((sum, item) => {
        const itemTotal =
            typeof item.total === "string" ? parseFloat(item.total.replace(/[^0-9.-]+/g, "")) : item.total;

        return sum + itemTotal;
    }, 0);
};
