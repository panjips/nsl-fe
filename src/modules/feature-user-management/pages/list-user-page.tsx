import { Button } from "@/components/ui/button";
import { UserTable } from "../components/";
import { useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { capitalizeFirstLetter, useLastCurrentLocation } from "@/lib/utils";

export const ListUserPage = () => {
    const navigate = useNavigate();

    const currentLocation = useLastCurrentLocation();

    const handleCreateUser = () => {
        navigate({ to: `/dashboard/user/create?type=${currentLocation}` });
    };

    return (
        <div className="flex flex-col gap-4">
            <PageHeader title={capitalizeFirstLetter(currentLocation)} />
            <div className="flex items-center justify-between">
                <div className="flex-1" />
                <Button variant="default" onClick={handleCreateUser} className="w-fit">
                    Create Product
                </Button>
            </div>
            <UserTable type={currentLocation} />
        </div>
    );
};
