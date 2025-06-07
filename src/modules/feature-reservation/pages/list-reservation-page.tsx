import { ReservationTable } from "../components/reservation-table";

export const ListReservationPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Reservations</h1>
            <ReservationTable />
        </div>
    );
};
