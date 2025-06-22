import { ReservationCateringSummary } from "../components/reservation-catering/reservation-catering-summary";

export const ReservationCateringReportPage = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold pb-4">Reservation Catering Report</h1>
            <ReservationCateringSummary />
        </div>
    );
};
