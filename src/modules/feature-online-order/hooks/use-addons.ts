import { useMemo } from "react";
import { useListAddon, type Addon } from "@/modules/feature-addon";

export const useAddons = () => {
    const { data: addonsData, isLoading } = useListAddon();

    const addons = useMemo(() => {
        if (!addonsData) return [];

        return addonsData as Addon[];
    }, [addonsData]);

    return {
        addons,
        isLoading,
    };
};
