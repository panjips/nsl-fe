import { useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useSharedStore } from "../stores/store";
import { toast } from "sonner";

export const StoreOperationPage = () => {
    const { store, getStatusStore, resetStoreState } = useSharedStore();

    const isStoreOpen = useMemo(() => {
        if (getStatusStore.state.state === "success") {
            return getStatusStore.state.data.isOpen;
        }
        return false;
    }, [getStatusStore.state.state]);

    const handleStoreToggle = async (checked: boolean) => {
        await store.openStore({ isOpen: checked });
    };

    useEffect(() => {
        getStatusStore.getStatusStore();
    }, []);

    useEffect(() => {
        if (store.state.state === "success") {
            toast.success("Store operation updated successfully!");
            getStatusStore.getStatusStore();
            resetStoreState();
        }
    }, [store.state]);

    return (
        <div className="bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Store Operations</CardTitle>
                    <p className="text-sm text-gray-600">Manage your store's operational status</p>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="text-center">
                        <Badge variant={isStoreOpen ? "default" : "destructive"} className="text-lg px-4 py-2">
                            {isStoreOpen ? "🟢 OPEN 🎉" : "🔴 CLOSED 😴"}
                        </Badge>
                    </div>

                    <div className="flex items-center justify-center space-x-4">
                        <span className="text-sm">😴 OFF</span>
                        <Switch
                            checked={isStoreOpen}
                            onCheckedChange={handleStoreToggle}
                            className="data-[state=checked]:bg-green-600"
                        />
                        <span className="text-sm">🚀 ON</span>
                    </div>

                    <div className="text-center text-sm text-gray-600">
                        {isStoreOpen ? "✨ Ready for customers! 🛒" : "💤 Taking a break..."}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
