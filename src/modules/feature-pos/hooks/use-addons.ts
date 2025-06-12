import { useMemo } from "react";
import { useListAddon } from "@/modules/feature-addon";
import { type AddOn } from "../domain";

export const useAddons = () => {
    const { data: addonsData, isLoading } = useListAddon();

    const addons = useMemo(() => {
        if (!addonsData) return [];

        return addonsData as AddOn[];
    }, [addonsData]);

    return {
        addons,
        isLoading,
    };
};
