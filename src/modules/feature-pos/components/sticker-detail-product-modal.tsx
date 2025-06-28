import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, X } from "lucide-react";
import { toast } from "sonner";
import { formatDateTime } from "@/lib/utils";
import { useStrickerStore } from "@/stores/sticker";

export const ConfirmationStrickerModal = () => {
    const { modalStricker, resetModalStricker } = useStrickerStore();
    const [isPrinting, setIsPrinting] = useState(false);
    const printFrameRef = useRef<HTMLIFrameElement>(null);

    const handleClose = () => {
        resetModalStricker();
    };

    const handlePrintStricker = () => {
        setIsPrinting(true);

        try {
            const strickerHTML = generateStrickerHTML();

            if (printFrameRef.current) {
                const frameDoc = printFrameRef.current.contentDocument;
                if (frameDoc) {
                    frameDoc.open();
                    frameDoc.write(strickerHTML);
                    frameDoc.close();

                    setTimeout(() => {
                        if (printFrameRef.current) {
                            printFrameRef.current.contentWindow?.focus();
                            printFrameRef.current.contentWindow?.print();

                            setIsPrinting(false);
                            toast.success("Stricker sent to printer");
                        }
                    }, 500);
                }
            }
        } catch (error) {
            console.error("Error printing stricker:", error);
            setIsPrinting(false);
            toast.error("Failed to print stricker");
        }
    };

    const generateStrickerHTML = () => {
        const date = new Date();
        const itemInOrders = modalStricker.data
            ?.map((item) => {
                const addons =
                    item.addOns && item.addOns.length > 0
                        ? item.addOns.map((addon) => `<div class="addon">+ ${addon.name}</div>`).join("")
                        : "";

                return `
                <div class="container">
                    <div class="header">
                        <div class="product-details">
                            <div class="product-name">${item.name}</div>
                            ${addons}
                        </div>
                    </div>
                    <div class="footer">
                        <div class="order-date message">Have a nice day</div>
                        <div class="order-date timestamp">${formatDateTime(date.toISOString())}</div>
                    </div>
                </div>
            `;
            })
            .join("");

        return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Sticker</title>
      <style>
        body {
          font-family: 'Helvetica', Arial, sans-serif;
          font-size: 7px;
          line-height: 1.1;
          margin: 0;
          padding: 0; 
          background: #fff;
        }

        @media print {
          @page {
            size: 50mm 30mm;
            margin: 0;
          }

          body {
            width: 50mm;
            height: 30mm;
            margin: 0;
            padding: 0;
            font-size: 7px;
            line-height: 1.1;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            overflow: hidden; 
          }
        }

        .container {
          display: flex;
          flex-direction: column;
          justify-content: space-between; 
          border: 0px solid #000;
          padding: 2mm 3mm;
          width: calc(50mm - 0px); 
          height: calc(30mm - 0px); 
          box-sizing: border-box; 
          position: relative; /* Needed for pseudo-element positioning */
          overflow: hidden; 
          /* Removed background-image, filter, and opacity from here */
        }

        /* Pseudo-element for the background logo */
        .container::before {
            content: ''; /* Essential for pseudo-elements */
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url("/bnw-nsl-logo.png");
            background-size: 70%; /* Adjust size as needed */
            background-repeat: no-repeat;
            background-position: center center;
            filter: grayscale(100%); /* Grayscale filter */
            opacity: 0.15; /* Low opacity */
            z-index: 0; /* Place behind content */
        }

        /* All content elements now need to be explicitly placed above the pseudo-element */
        .header, .footer {
            position: relative;
            z-index: 1; /* Ensure these are above the background pseudo-element */
        }


        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1mm;
        }

        .product-details {
          flex-grow: 1; 
          margin-right: 2mm;
          word-wrap: break-word; 
          overflow: hidden;
          line-height: 1.1;
          padding-right: 2mm;
        }

        .product-name {
          font-weight: bold;
          font-size: 9px;
          margin-bottom: 0.5mm;
          white-space: normal;
        }

        .addon {
          margin-left: 1mm;
          font-style: italic;
          font-size: 6.5px;
          line-height: 1;
          display: block;
        }
        
        .footer {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin-top: auto;
          line-height: 1;
        }

        .order-date {
          font-size: 6.5px;
          line-height: 1;
        }

        .order-date.message {
            margin-bottom: 0.5mm;
        }
      </style>
    </head>
    <body>
                ${itemInOrders}
    </body>
    </html>
    `;
    };

    return (
        <>
            <Dialog open={modalStricker.isOpen} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Print Stricker</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col items-center space-y-6 py-4">
                        <div className="rounded-full bg-primary/10 p-4">
                            <Printer size={24} className="text-primary" />
                        </div>

                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-medium">Want to print stricker?</h3>
                            <p className="text-sm text-muted-foreground">
                                A copy of the stricker will be printed for your records.
                            </p>
                        </div>

                        <div className="flex w-full justify-between">
                            <Button variant="outline" onClick={handleClose} className="flex items-center gap-2">
                                <X size={16} />
                                Skip
                            </Button>

                            <Button
                                onClick={() => handlePrintStricker()}
                                disabled={isPrinting}
                                className="flex items-center gap-2"
                            >
                                {isPrinting ? (
                                    <>
                                        <span className="animate-spin mr-1">⏳</span>
                                        Printing...
                                    </>
                                ) : (
                                    <>
                                        <Printer size={16} />
                                        Print Stricker
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    <iframe ref={printFrameRef} style={{ display: "none" }} title="Print Frame" />
                </DialogContent>
            </Dialog>
        </>
    );
};
