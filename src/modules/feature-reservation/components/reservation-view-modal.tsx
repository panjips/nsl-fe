"use client";

import { Modal } from "@/components/modal";
import { useViewReservation } from "../hooks";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Clock, MapPin, Calendar, X, Coffee, Users, FileText, User, Phone, MailIcon } from "lucide-react";

export const ReservationViewModal = ({
    id,
}: {
    id: number | string | undefined;
}) => {
    const { isLoading, isOpen, onOpenChange, data } = useViewReservation();

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    const cartFee = 500000;

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), "EEEE, MMMM d, yyyy 'at' h:mm a");
    };

    const renderStatus = () => {
        if (!data) return null;

        const status = data.status;
        let className = "";
        let icon = null;

        if (status === "PENDING") {
            className = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
            icon = <Clock className="h-4 w-4 mr-1" />;
        }
        if (status === "CONFIRMED") {
            className = "bg-green-100 text-green-800 hover:bg-green-100";
            icon = <Check className="h-4 w-4 mr-1" />;
        }
        if (status === "COMPLETED") {
            className = "bg-blue-100 text-blue-800 hover:bg-blue-100";
            icon = <Check className="h-4 w-4 mr-1" />;
        }
        if (status === "CANCELLED") {
            className = "bg-red-100 text-red-800 hover:bg-red-100";
            icon = <X className="h-4 w-4 mr-1" />;
        }

        return (
            <Badge className={`capitalize flex items-center ${className}`}>
                {icon}
                {status}
            </Badge>
        );
    };

    return (
        <Modal
            open={isOpen}
            onOpenChange={onOpenChange}
            title={
                <div className="flex items-center justify-between w-full">
                    <span>Reservation #{data?.id}</span>
                    {data && renderStatus()}
                </div>
            }
            size="2xl"
            isFooter={true}
            cancelText="Close"
            showCancelButton={true}
            hideActionButton={true}
        >
            {isLoading ? (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
            ) : (
                data && (
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    <div>Customer Information</div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium">Name</p>
                                            <p className="text-sm text-muted-foreground">
                                                {data.user?.name || "Michael Tan"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MailIcon className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium">Email</p>
                                            <p className="text-sm text-muted-foreground">
                                                <a
                                                    href={`mailto:${data.user?.email || "panjipusaka71@gmail.com"}`}
                                                    className="hover:underline"
                                                >
                                                    {data.user?.email || "panjipusaka71@gmail.com"}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium">Phone</p>
                                            <p className="text-sm text-muted-foreground">
                                                <a
                                                    href={`tel:${data.user?.phone_number || "082123456789"}`}
                                                    className="hover:underline"
                                                >
                                                    {data.user?.phone_number || "082123456789"}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    <div>Event Details</div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium">Location</p>
                                            <p className="text-sm text-muted-foreground">{data.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium">Event Date</p>
                                            <p className="text-sm text-muted-foreground">
                                                {formatDate(data.event_date)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {data.notes && (
                                    <div className="flex items-start gap-3">
                                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium">Notes</p>
                                            <p className="text-sm text-muted-foreground">{data.notes}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {data.orderCaterings && data.orderCaterings.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Coffee className="h-5 w-5" />
                                        Catering Packages
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Package ID</TableHead>
                                                <TableHead className="text-center">Quantity</TableHead>
                                                <TableHead className="text-center">Free Cups</TableHead>
                                                <TableHead className="text-center">Size</TableHead>
                                                <TableHead className="text-right">Price</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {data.orderCaterings.map((order) => (
                                                <TableRow key={order.id}>
                                                    <TableCell className="font-medium">
                                                        Package #{order.catering_package_id}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <Users className="h-4 w-4 text-muted-foreground" />
                                                            {order.quantity_cup}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {order.free_cup || 0} cups
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {order.size_volume}
                                                        {order.size_unit}
                                                    </TableCell>
                                                    <TableCell className="text-right font-medium">
                                                        {formatCurrency(order.price)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {data.orderCaterings && data.orderCaterings.length > 0 ? (
                                    <>
                                        <div className="space-y-2">
                                            {data.orderCaterings.map((order) => (
                                                <div key={order.id} className="flex justify-between text-sm">
                                                    <span>Package #{order.catering_package_id}</span>
                                                    <span>{formatCurrency(order.price)}</span>
                                                </div>
                                            ))}
                                            {data.is_use_cart && (
                                                <div className="flex justify-between text-sm">
                                                    <span>Cart Fee</span>
                                                    <span>{formatCurrency(cartFee)}</span>
                                                </div>
                                            )}
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between items-center text-lg font-semibold">
                                            <span>Total Amount</span>
                                            <span>{formatCurrency(data.total_price)}</span>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">
                                        No catering packages found for this reservation
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )
            )}
        </Modal>
    );
};
