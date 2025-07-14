import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, X } from "lucide-react";
import { useOrderStore } from "../stores";
import { toast } from "sonner";
import { formatCurrency, formatNumberWithDots } from "@/lib/utils";

export const ConfirmationInvoiceModal = () => {
    const { modalInvoice, resetModalInvoice } = useOrderStore();
    const [isPrinting, setIsPrinting] = useState(false);
    const printFrameRef = useRef<HTMLIFrameElement>(null);

    const cartTotal =
        modalInvoice.data?.reduce((total, item) => {
            let totalAddon = 0;

            if (item.addOns && Array.isArray(item.addOns)) {
                totalAddon = item.addOns.reduce((addonTotal, addon) => {
                    return addonTotal + (typeof addon.price === "number" ? addon.price : 0);
                }, 0);
            }

            return total + item.price * item.quantity + totalAddon;
        }, 0) || 0;

    const handleClose = () => {
        resetModalInvoice();
    };

    const handlePrintInvoice = () => {
        setIsPrinting(true);

        try {
            const invoiceHTML = generateInvoiceHTML();

            if (printFrameRef.current) {
                const frameDoc = printFrameRef.current.contentDocument;
                if (frameDoc) {
                    frameDoc.open();
                    frameDoc.write(invoiceHTML);
                    frameDoc.close();

                    setTimeout(() => {
                        if (printFrameRef.current) {
                            printFrameRef.current.contentWindow?.focus();
                            printFrameRef.current.contentWindow?.print();

                            setIsPrinting(false);
                            toast.success("Invoice sent to printer");
                        }
                    }, 500);
                }
            }
        } catch (error) {
            console.error("Error printing invoice:", error);
            setIsPrinting(false);
            toast.error("Failed to print invoice");
        }
    };

    const generateInvoiceHTML = () => {
        const itemsTableRowsHTML =
            modalInvoice.data
                ?.map((item) => {
                    let addOnsHTML = "";
                    if (item.addOns && item.addOns.length > 0) {
                        addOnsHTML = item.addOns
                            .map(
                                (addon) => `
                        <tr>
                            <td class="item-qty"></td>
                            <td class="item-name add-on-name">+ ${addon.name}</td>
                            <td class="item-price add-on-price"></td>
                        </tr>
                    `,
                            )
                            .join("");
                    }

                    return `
                <tr>
                    <td class="item-qty">${item.quantity}</td>
                    <td class="item-name">${item.name}</td>
                    <td class="item-price">${formatNumberWithDots(item.price)}</td>
                </tr>
                ${addOnsHTML}
            `;
                })
                .join("") || "";

        const date = new Date();
        const formatted = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(date);

        const heightInvoice = () => {
            const headerHeight = 35;
            const dividerHeight = 4 * 5;
            const itemTotalHeight = 12;
            const thankYou = 12;

            const tableHeaderHeight = 15;
            const tableRowHeight = 18;

            let calculatedItemDataHeight = 0;
            if (modalInvoice.data) {
                modalInvoice.data.forEach((item) => {
                    calculatedItemDataHeight += tableRowHeight;
                    if (item.addOns && item.addOns.length > 0) {
                        calculatedItemDataHeight += item.addOns.length * (tableRowHeight - 4);
                    }
                });
            }

            return (
                headerHeight +
                dividerHeight +
                4 * 4 +
                calculatedItemDataHeight +
                tableHeaderHeight +
                itemTotalHeight +
                thankYou +
                50
            );
        };

        return `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8" />
            <title>Thermal Invoice</title>
            <style>
              body {
                font-family: 'Helvetica', Arial, sans-serif;
                font-size: 8px;
                line-height: 1.3;
                margin: 0;
                padding: 8px 5px;
                background: #fff;
              }

              @media print {
                @page {
                  width: 58mm;
                  height: ${heightInvoice()}px;
                  margin: 0;
                }

                body {
                  width: 58mm;
                  margin: 0;
                  padding: 2mm 5mm;
                  font-weight: bold;
                  font-size: 8px;
                  line-height: 1.2;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }

                .section {
                  margin-bottom: 4px;
                }

                .header {
                  font-size: 10px;
                  font-weight: bold;
                  text-align: center;
                  margin-bottom: 2px;
                }

                .subheader {
                  font-size: 8px;
                  text-align: center;
                  margin-bottom: 1px;
                }

                .text-center {
                  text-align: center;
                }

                .divider {
                  border-top: 1px dashed #000;
                  margin: 4px 0;
                }

                
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 2px;
                }

                th, td {
                    text-align: left;
                    padding: 2px 0;
                    vertical-align: top;
                }

                th {
                    font-weight: bold;
                }

                .item-qty {
                    width: 15%;
                    text-align: left;
                }

                .item-name {
                    width: 65%;
                    word-break: break-word;
                }
                
                .add-on-name {
                    padding-left: px; 
                    font-size: 7px; 
                }

                .item-price {
                    width: 20%;
                    text-align: right;
                }

                .add-on-price {
                    font-size: 7px; 
                }

                .total-row {
                  display: flex;
                  justify-content: space-between;
                  margin-top: 6px;
                  font-weight: bold;
                  font-size: 9px;
                }

                .thank-you {
                  text-align: center;
                  margin-top: 10px;
                  font-size: 8px;
                }

                .no-print {
                  display: none;
                }
                
                .section-height { height: 12px; }
                .section-header-height { height: 35px }
                .header-height { height: 14px; }
                .subheader-height { height: 10px; }
                .divider-height { height: 4px; }
                .total-row-height { height: 12px; }
                .thank-you-height { height: 10px; }
                .date-row-height { height: 10px; }
              }
            </style>
          </head>
          <body>
            <div class="section section-header-height">
              <div class="header header-height">Needsixletters Coffee</div>
              <div class="subheader subheader-height">Pantai Masceti, Gianyar, Bali</div>
              <div class="subheader subheader-height text-center">www.needsixletters.com</div>
            </div>

            <div class="divider divider-height"></div>

            <div class="section section-height date-row-height">
              <div>${formatted}</div>
            </div>

            <div class="divider divider-height"></div>

            <table>
              <thead>
                <tr>
                  <th class="item-qty">Qty</th>
                  <th class="item-name">Item</th>
                  <th class="item-price">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsTableRowsHTML}
              </tbody>
            </table>

            <div class="divider divider-height"></div>

            <div class="total-row total-row-height">
              <div>Total:</div>
              <div>${formatCurrency(cartTotal)}</div>
            </div>

            <div class="divider divider-height"></div>

            <div class="section section-height">
              <div class="thank-you thank-you-height">Thanks for your order!</div>
            </div>
          </body>
          </html>
        `;
    };

    return (
        <>
            <Dialog open={modalInvoice.isOpen} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Print Invoice</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col items-center space-y-6 py-4">
                        <div className="rounded-full bg-primary/10 p-4">
                            <Printer size={24} className="text-primary" />
                        </div>

                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-medium">Want to print invoice?</h3>
                            <p className="text-sm text-muted-foreground">
                                A copy of the invoice will be printed for your records.
                            </p>
                        </div>

                        <div className="flex w-full justify-between">
                            <Button variant="outline" onClick={handleClose} className="flex items-center gap-2">
                                <X size={16} />
                                Skip
                            </Button>

                            <Button
                                onClick={() => handlePrintInvoice()}
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
                                        Print Invoice
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
