import { useEffect, useMemo } from "react";
import { useHistoryStore } from "../stores";
import { toast } from "sonner";

export const useRepayment = () => {
    const { modalRepayment, resetModalRepayment, repaymentToken, resetRepaymentToken } = useHistoryStore();

    const tokenRepay = useMemo(() => {
        return repaymentToken.state.state === "success" ? repaymentToken.state.data.token : null;
    }, [repaymentToken.state]);

    const handleOpenRepayment = (id: number | string) => {
        modalRepayment.onOpen("loading", null, id);
        repaymentToken.getRepaymentToken(id);
    };

    useEffect(() => {
        if (repaymentToken.state.state === "success") {
            modalRepayment.onOpen("repayment", tokenRepay);
        } else if (repaymentToken.state.state === "error") {
            toast.error("Failed to fetch repayment token: " + repaymentToken.state.error);
            resetRepaymentToken();
        }
    }, [repaymentToken.state.state]);

    const handlePaymentSuccess = () => {
        toast.dismiss();
        toast.success("Payment completed successfully!");
        resetModalRepayment();
        resetRepaymentToken();
    };

    const handlePaymentError = (error: any) => {
        toast.error("Payment failed: " + (error?.message || "Unknown error"));
        resetRepaymentToken();
    };

    const handlePaymentClose = () => {
        toast.info("Payment canceled");
        resetRepaymentToken();
    };

    return {
        token: tokenRepay,
        state: repaymentToken.state,
        handleOpenRepayment,
        handlePaymentSuccess,
        handlePaymentError,
        handlePaymentClose,
    };
};
