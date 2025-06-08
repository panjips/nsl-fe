import { Modal } from "@/components/modal";

export const ReservationOrderModal = ({
    isOpen,
    onOpenChange,
    onAction,
}: { isOpen: boolean; onOpenChange: any; onAction: () => void }) => {
    return (
        <Modal
            open={isOpen}
            onOpenChange={onOpenChange}
            title="Terms & Conditions"
            size="xl"
            isFooter={true}
            showCancelButton={false}
            onAction={onAction}
        >
            <div className="grid gap-4 py-2 max-h-[60vh] overflow-y-auto">
                <div className="grid gap-1">
                    <h3 className="font-semibold text-lg">📍 Tempat</h3>
                    <p className="text-sm text-muted-foreground">
                        Jika request menggunakan gerobak pada lokasi acara, sediakan tempat sebesar 2x2m. Jika tidak
                        menggunakan gerobak siapkan meja kokoh dengan panjang minimal 150cmx50cm.
                    </p>
                </div>

                <div className="grid gap-1">
                    <h3 className="font-semibold text-lg">⚡ Kelistrikan</h3>
                    <p className="text-sm text-muted-foreground">
                        Kelistrikan minimum 2200W/220V digunakan untuk mesin esspresso dan grinder.
                    </p>
                </div>

                <div className="grid gap-1">
                    <h3 className="font-semibold text-lg">📦 Loading Barang</h3>
                    <p className="text-sm text-muted-foreground">
                        Untuk acara yang membutuhkan gerobak kami akan loading barang pada h-1 malam hari. Untuk
                        informasi lebih lanjut akan kami hubungi via WhatsApp.
                    </p>
                </div>

                <div className="grid gap-1">
                    <h3 className="font-semibold text-lg">🕒 Waktu Kerja</h3>
                    <p className="text-sm text-muted-foreground">
                        Waktu kerja 6 jam dengan waktu yang ditentukan oleh konsumen. Untuk info lebih lanjut bisa
                        hubungi kami via WhatsApp.
                    </p>
                </div>

                <div className="grid gap-1">
                    <h3 className="font-semibold text-lg">☕ Ketersediaan Produk</h3>
                    <p className="text-sm text-muted-foreground">
                        Jika produk yang disediakan telah habis, Bisa melakukan penambahan ketersediaan produk &
                        dikenakan biaya Rp. 17.000/cup.
                    </p>
                </div>

                <div className="grid gap-1">
                    <h3 className="font-semibold text-lg">💰 Payment</h3>
                    <p className="text-sm text-muted-foreground">
                        Pembayaran untuk uang muka (DP) minimal h-7 sebelum acara. Untuk pelunasan maksimal h+3 setelah
                        acara berakhir.
                    </p>
                </div>
            </div>
        </Modal>
    );
};
