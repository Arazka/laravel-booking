import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";

export default function Index({ rentals }) {
    const handleDelete = (value) => {
        router.delete(route("rentals.destroy", value));
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Rentals Data
                    </h2>
                    <Link
                        href={route("rentals.create")}
                        className="px-4 py-2.5 text-xs font-medium tracking-wider text-white uppercase transition-all duration-300 bg-indigo-600 rounded-md hover:bg-indigo-500"
                    >
                        New Rental
                    </Link>
                </div>
            }
        >
            <Head title="Rentals Data" />

            <div className="py-12">
                <div className="mx-auto space-y-4 max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-10 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="space-y-12">
                            {rentals?.data?.length === 0 && <p>Data kosong</p>}
                            {rentals?.data?.map((rental, index) => (
                                <div
                                    key={index}
                                    className="flex items-start justify-between"
                                >
                                    <div>
                                        <p className="mb-2 text-xs tracking-wider text-gray-500 uppercase">
                                            Image
                                        </p>
                                        <img
                                            src={rental.image}
                                            alt=""
                                            className="w-full h-20 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <p className="mb-2 text-xs tracking-wider text-gray-500 uppercase">
                                            Name
                                        </p>
                                        <p className="mb-2 text-gray-900">
                                            {rental.name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-xs tracking-wider text-gray-500 uppercase">
                                            Price
                                        </p>
                                        <p className="mb-2 text-gray-900">
                                            RP {rental.price}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-xs tracking-wider text-gray-500 uppercase">
                                            Duration
                                        </p>
                                        <p className="mb-2 text-gray-900">
                                            {rental.duration} jam (per sesi)
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-xs tracking-wider text-gray-500 uppercase">
                                            Stock
                                        </p>
                                        <p className="mb-2 text-gray-900">
                                            {rental.stock} Unit
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Link
                                            href={route(
                                                "rentals.edit",
                                                rental.id
                                            )}
                                            className="px-4 py-2.5 text-xs font-medium tracking-wider text-white uppercase transition-all duration-300 bg-gray-600 rounded-md hover:bg-gray-500"
                                        >
                                            Edit
                                        </Link>
                                        <DangerButton
                                            onClick={() =>
                                                handleDelete(rental.id)
                                            }
                                        >
                                            Delete
                                        </DangerButton>
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
