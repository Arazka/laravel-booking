import { Link } from "@inertiajs/react";
import React from "react";

export default function Detail({ rental }) {
    // console.log(rental);
    return (
        <div className="flex items-center justify-center mx-auto bg-gray-100">
            <div className="relative w-full min-h-screen bg-white shadow-sm max-w-screen-2xl">
                <div className="relative w-full">
                    <img
                        src={rental.image}
                        alt=""
                        className="w-full h-[30rem] object-cover object-center"
                    />
                </div>
                <div className="flex justify-between gap-12 px-6 mt-8">
                    <div className="flex-1">
                        <p className="mb-2 text-xl font-medium">Desciprtion</p>
                        <div className="text-sm text-gray-500">
                            {rental.description}
                        </div>
                    </div>
                    <div className="flex-none w-[30rem] px-4">
                        <p className="text-xl font-semibold tracking-widest">
                            {rental.name}
                        </p>
                        <hr className="my-2" />
                        <div className="text-base">
                            <p>Tersedia {rental.stock} unit</p>
                            <p>Rp {rental.price}</p>
                        </div>
                        <div className="w-full mt-12">
                            <Link
                                href={`/rental/${rental.name}/booking`}
                                className="w-full px-12 py-4 text-white bg-indigo-600 border rounded-full hover:bg-indigo-500"
                            >
                                Booking Now
                            </Link>
                        </div>
                    </div>
                </div>
                <footer className="mt-[5rem]"></footer>
            </div>
        </div>
    );
}
