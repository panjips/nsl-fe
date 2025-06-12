import { useEffect, useRef } from "react";

interface MidtransPaymentProps {
    clientKey: string;
    transactionToken?: string;
    onSuccess?: () => void;
    onPending?: () => void;
    onError?: (error: any) => void;
    onClose?: () => void;
}

declare global {
    interface Window {
        snap?: {
            pay: (token: string, options: any) => void;
        };
    }
}

export function MidtransPayment({
    clientKey,
    transactionToken,
    onSuccess,
    onPending,
    onError,
    onClose,
}: MidtransPaymentProps) {
    const scriptLoaded = useRef(false);

    useEffect(() => {
        if (!scriptLoaded.current) {
            const script = document.createElement("script");
            script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
            script.setAttribute("data-client-key", clientKey);
            script.async = true;

            script.onload = () => {
                scriptLoaded.current = true;
                if (transactionToken) {
                    triggerPayment(transactionToken);
                }
            };

            document.head.appendChild(script);

            return () => {
                if (document.head.contains(script)) {
                    document.head.removeChild(script);
                    scriptLoaded.current = false;
                }
            };
        }
    }, [clientKey]);

    useEffect(() => {
        if (scriptLoaded.current && transactionToken) {
            triggerPayment(transactionToken);
        }
    }, [transactionToken]);

    const triggerPayment = (token: string) => {
        if (window.snap) {
            window.snap.pay(token, {
                onSuccess: () => {
                    console.log("Payment success");
                    onSuccess?.();
                },
                onPending: () => {
                    console.log("Payment pending");
                    onPending?.();
                },
                onError: (error: any) => {
                    console.error("Payment error:", error);
                    onError?.(error);
                },
                onClose: () => {
                    console.log("Customer closed the payment dialog");
                    onClose?.();
                },
            });
        } else {
            console.error("Snap.js has not loaded yet");
        }
    };

    return null;
}
