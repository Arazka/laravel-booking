import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";

export default function Index({ bookings }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Bookings Data
                    </h2>
                </div>
            }
        >
            <Head title="Bookings Data" />

            <div className="py-12">
                <div className="mx-auto space-y-4 max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-10 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="space-y-12">
                            {bookings?.data?.length === 0 && <p>Data kosong</p>}
                            {bookings?.data?.map((booking, index) => (
                                <div
                                    key={index}
                                    className="flex items-start justify-between"
                                >
                                    <div>
                                        <p className="mb-2 text-xs tracking-wider text-gray-500 uppercase">
                                            Rental Item
                                        </p>
                                        <p className="mb-2 text-gray-900">
                                            {booking.rental.name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-xs tracking-wider text-gray-500 uppercase">
                                            Name
                                        </p>
                                        <p className="mb-2 text-gray-900">
                                            {booking.name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-xs tracking-wider text-gray-500 uppercase">
                                            Booking Date
                                        </p>
                                        <p className="mb-2 text-gray-900">
                                            {booking.booking_date}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-xs tracking-wider text-gray-500 uppercase">
                                            Duration
                                        </p>
                                        <p className="mb-2 text-gray-900">
                                            {booking.duration} jam
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-xs tracking-wider text-gray-500 uppercase">
                                            Price Total
                                        </p>
                                        <p className="mb-2 text-gray-900">
                                            Rp {booking.total_price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
