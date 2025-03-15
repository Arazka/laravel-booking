import { Link } from "@inertiajs/react";
import React from "react";

export default function PaymentSuccess() {
    return (
        <div className="flex flex-col items-center justify-start h-screen border">
            <div className="w-full max-w-md p-8 my-auto border border-green-400 shadow-lg bg-green-50 rounded-2xl">
                <h1 className="mb-6 text-xl font-semibold text-center text-green-600">
                    Payment Success!
                </h1>
                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="w-full px-8 py-3 text-sm text-white bg-gray-900 rounded-full"
                    >
                        Kembali Ke Halaman Utama
                    </Link>
                </div>
            </div>
        </div>
    );
}
