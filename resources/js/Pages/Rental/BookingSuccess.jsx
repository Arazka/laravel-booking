import React from "react";

export default function BookingSuccess({ paymentUrl, booking }) {
    // console.log(paymentUrl);
    // console.log(booking);
    return (
        <div className="flex flex-col items-center justify-start h-screen border">
            <div className="w-full max-w-md p-8 my-auto bg-white shadow-lg rounded-2xl">
                <h1 className="mb-6 text-xl font-semibold text-center underline underline-offset-8">
                    Booking Sukses
                </h1>
                <div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">Booking Kode</p>
                        <p>{booking?.booking_code}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">Nama</p>
                        <p>{booking?.name}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">No HP</p>
                        <p>{booking?.phone}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">Booking Date</p>
                        <p>{booking?.booking_date}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">Duratrion</p>
                        <p>{booking?.duration} jam</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">Total</p>
                        <p>Rp {booking?.total_price}</p>
                    </div>
                </div>
                <hr className="my-4" />
                <div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">Rental Items</p>
                        <p>{booking?.rental?.name}</p>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <a
                        href={paymentUrl}
                        className="w-full px-8 py-3 text-sm text-white bg-gray-900 rounded-full"
                    >
                        Lanjutkan Pembayaran
                    </a>
                </div>
            </div>
        </div>
    );
}
