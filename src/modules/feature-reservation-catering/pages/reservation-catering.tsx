import { ReservationForm } from "../components";

export const ReservationCateringPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Reservation Catering</h1>
            <ReservationForm />
        </div>
    );
};
