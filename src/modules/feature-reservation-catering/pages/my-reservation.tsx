import { MyReservationTable } from "../components";

export const MyReservationPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">My Reservation</h1>
            <MyReservationTable />
        </div>
    );
};
